class Svm{
	constructor(termPresence, dokumenTraining){
		var _dokumenTraining = dokumenTraining;
		var _maxIter = 50;
		var _lambda = 0.5;
		var _learningRate = 0.001;
		var _C = 1;
		var _termPresenceTraining = termPresence;
		var maxDeltaAlpha = 0;
		this.getLearningRate = function(){
			return _learningRate;
		}
		this.getC = function(){
			return _C;
		}
		this.getLambda = function(){
			return _lambda;
		}
		this.getDokumenTraining = function(){
			return _dokumenTraining;
		}
		this.getDokumenTrainingClass = function(indeks){
			return _dokumenTraining[indeks].kelas;
		}
		this.getJumlahDokumenTraining = function(){
			return _dokumenTraining.length;
		}
		this.getIter = function(){
			return _maxIter;
		}
		this.getTermPresenceTraning = function(term,dokumen){
			if (term != undefined) {
				// console.log(term+' '+dokumen);
				// console.log(_termPresenceTraining);
				return _termPresenceTraining[term][dokumen];
			}
			else
				return _termPresenceTraining;
		}
		this.getMaxIter = function(){
			return _maxIter;
		}
		this.updateMaxDeltaAlpha = function(val){
			maxDeltaAlpha = val;
		}
		this.getMaxDeltaAlpha = function(){
			return maxDeltaAlpha;
		}
	}

	polynomialKernel(chromosome, kernelParam, termPresence, dokumenLength){
		// console.log('chromosome'+chromosome);
		var _kernel = [];
		for (var i = 0; i < this.getJumlahDokumenTraining(); i++) { //dokumen Training
			var _temp = [];
			for (var j = 0; j < dokumenLength; j++) { //dokumen yang dikirim
				var _tempHitung = 0;
				for (var k = 0; k < chromosome.length; k++) { //perulangan mengambil term	
				// console.log(chromosome[k]+" "+j);
					_tempHitung += (this.getTermPresenceTraning(chromosome[k], i) * termPresence[chromosome[k]][j]);
				}
				_temp.push(Math.pow((_tempHitung + 1), kernelParam));
			}
			_kernel.push(_temp);
		}
		return _kernel;	   
	}

	gaussianRBF(chromosome, sigma, termPresence, dokumenLength){
		// console.log("---"+chromosome);
		var _kernel = [];
		for (var i = 0; i < this.getJumlahDokumenTraining(); i++) {
			var temp = [];
			for (var j = 0; j < dokumenLength; j++) {
				var jarak = 0;
				for (var k = 0; k < chromosome.length; k++) {
					// if (termPresence[chromosome[k]] == undefined) {
					// 	console.log("ini dia");
					// 	console.log(chromosome[k]);
					// }
					jarak += Math.pow(termPresence[chromosome[k]][j] - this.getTermPresenceTraning(chromosome[k], i),2);
				}
				// console.log(jarak);
				jarak = Math.exp(-(jarak/2*(Math.pow(sigma,2))));
				// console.log(jarak);
				temp.push(jarak);
			}
			_kernel.push(temp);
		}
		return _kernel
	}

	hitungHessian(kernel, lambda = this.getLambda()){
		var _hessian = [];
		for (var i = 0; i < this.getJumlahDokumenTraining(); i++) {
			var _temp = [];
			for (var j = 0; j < this.getJumlahDokumenTraining(); j++) {
				// console.log(this.getDokumenTrainingClass(j));
				_temp[j] = this.getDokumenTrainingClass(i) * this.getDokumenTrainingClass(j) * (kernel[i][j] + Math.pow(lambda,2));
				// if (_temp[j] < 0) {
				// 	console.log(_temp[j]);
				// }
			}			
			_hessian.push(_temp);
		}
		return _hessian;
	}

	updateE(hessian, alpha){
		var _E = [];		
		// console.log(hessian);
		for (var i = 0; i < this.getJumlahDokumenTraining(); i++) {        
	        var _temp = 0;
	        if (alpha.length != 0) {	        
	        	// console.log(alpha);
	        	for (var j = 0; j < hessian.length; j++) {
	        		// console.log("hessian ke-"+i+","+j+hessian[i][j]);
	        		// console.log("alpha ke-"+i+" "+alpha[i]);
	        		// console.log(hessian[i][j] * alpha[i]);
		            _temp += hessian[i][j] * alpha[i];	
		            // console.log(_temp);
		        }
	        }
	        // console.log(_E);
	        _E.push(_temp);
	    }
	    return _E;
	}

	updateDeltaAlpha(_E, _alpha, _C = this.getC(), _learningRate = this.getLearningRate()){
		var _deltaAlpha = [];
		// console.log(_alpha.length);
		for (var i = 0; i < _E.length; i++) {
			_deltaAlpha.push(Math.min(Math.max(_learningRate * (1 - _E[i]), (_alpha.length != 0)? -_alpha[i]:0), _C - ((_alpha.length != 0)? -_alpha[i]:0)));
		}
		this.updateMaxDeltaAlpha(Math.max(..._deltaAlpha));
		return _deltaAlpha;
	}

	updateAlpha(alpha, deltaAlpha){
		var _alpha = [];
		for (var i = 0 ; i < deltaAlpha.length; i++) {
			_alpha.push(((alpha.length != 0)?alpha[i]:0) + deltaAlpha[i]);
		}
		return _alpha;
	}

	findSupportVector(alpha){
		// console.log(alpha);
		var supportVector = [];		
		alpha.map(function(alphaValue, indeks){
			if (alphaValue >= 0) {
				supportVector.push({'alpha':alphaValue, 'dokIndeks':indeks, 'kelas':this.getDokumenTrainingClass(indeks)});
			}
		}, this);
		return supportVector;		
	}

	hitungB(supportVector, posSupportVector, negSupportVector, kernel){
		var tempPos = 0;
		var tempNeg = 0;
		supportVector.map(function(sv){
			tempPos += (sv.alpha * sv.kelas * kernel[sv.dokIndeks][posSupportVector.dokIndeks]);
			tempNeg += (sv.alpha * sv.kelas * kernel[sv.dokIndeks][negSupportVector.dokIndeks]);
		});

		return -0.5 * (tempPos + tempNeg);
	}

	train(individu, kernel, kernelParam, maxIter = this.getMaxIter()){
		// console.log("train : "+individu.flag);
		if (kernel == 1) {
			var kernel = this.polynomialKernel(individu.chromosome, kernelParam, this.getTermPresenceTraning(), this.getJumlahDokumenTraining());		
		}
		else
			var kernel = this.gaussianRBF(individu.chromosome, kernelParam, this.getTermPresenceTraning(), this.getJumlahDokumenTraining());		
		// if (individu.chromosome == undefined) {
		// 	console.log(individu);
		// }
		
		// console.log(kernel);
		var hessian = this.hitungHessian(kernel);		
		// console.log(hessian);
		while(maxIter > 0){
			console.log("iterasi svm ke-"+maxIter);
			var _E = this.updateE(hessian, individu.alpha);
			// console.log("E ke-"+maxIter+" "+_E);
			var deltaAlpha = this.updateDeltaAlpha(_E, individu.alpha);
			// console.log("delta alpha ke-"+maxIter+" "+deltaAlpha);
			individu.alpha = this.updateAlpha(individu.alpha, deltaAlpha);
			// console.log("alpha ke-"+maxIter+" "+individu.alpha);
			// console.log("----"+maxIter);
			// if (this.getMaxDeltaAlpha() > 0.0004) {
			// 	console.log("masuk---"+this.getMaxDeltaAlpha()+" : "+maxIter);
			// 	break;
			// }
			maxIter--;
			// console.log(maxIter);
		}

		var supportVector = this.findSupportVector(individu.alpha);
		var posSupportVector = {};
		var negSupportVector = {};

		supportVector.map(function(sv, indeks){
			if (sv.kelas == 1) {
				if (posSupportVector.alpha != undefined && posSupportVector.alpha < sv.alpha) {					
					posSupportVector = supportVector[indeks];
				}
				else if (posSupportVector.alpha == undefined) {
					posSupportVector = supportVector[indeks];
				}
			}
			else{
				if (negSupportVector.alpha != undefined && negSupportVector.alpha < sv.alpha) {
					negSupportVector = supportVector[indeks];
				}
				else if (negSupportVector.alpha == undefined) {
					negSupportVector = supportVector[indeks];
				}
			}
		});		

		individu.beta = this.hitungB(supportVector,posSupportVector,negSupportVector, kernel);
		return individu;
	}

	testing(individu, dokumen = this.getDokumenTraining()){
		// console.log("testing : "+individu);
		// console.log("masuka");
		// var kernel = this.polynomialKernel(individu.chromosome, 2, this.getTermPresenceTraning(), this.getJumlahDokumenTraining());
		var kernel = this.gaussianRBF(individu.chromosome, kernelParam, this.getTermPresenceTraning(), this.getJumlahDokumenTraining());
		// if (individu.chromosome == undefined) {
		// 	console.log(individu);
		// }
		var supportVector = this.findSupportVector(individu.alpha);
		var correct = 0;
		// console.log(kernel);
		// console.log(supportVector);
		for (var i = 0; i < dokumen.length; i++) {
			var temp = 0;
			var tempKelas = -1;
			supportVector.map(function(sv){
				temp += (sv.alpha * sv.kelas * kernel[sv.dokIndeks][i]);					
			});	
			temp += individu.beta;
			// console.log('-----------');
			// console.log(temp);
			if (temp >= 0) {
				// console.log('masuk');
				tempKelas = 1;			
			}	
			// console.log('kelas klasifikasi:' + tempKelas);

			if (tempKelas == dokumen[i].kelas) {
				// console.log('masuk : '+i);
				correct++;
			}
			// console.log('-----------');
		}
		individu.akurasi = correct/dokumen.length * 100;
		return individu;
	}

	klasifikasi(individu, kernel, kernelParam, termPresence, dokumenLength){		
		// console.log(termPresence);		
		if (kernel == 1) {			
			var kernel = this.polynomialKernel(individu.chromosome, kernelParam, termPresence, dokumenLength);
		}		
		else{
			var kernel = this.gaussianRBF(individu.chromosome, kernelParam, termPresence, dokumenLength);
		}
		var supportVector = this.findSupportVector(individu.alpha);		
		var result = [];		
		// console.log(supportVector);
		for (var i = 0; i < kernel[0].length; i++) {
			var temp = 0;
			// console.log(kernel[i]);
			supportVector.map(function(sv, indeks){
				// console.log('support v indeks: '+sv.dokIndeks);
				// if (sv.alpha * sv.kelas * kernel[sv.dokIndeks][i] < 0) {
				// 	console.log((sv.alpha * sv.kelas * kernel[sv.dokIndeks][i])+" : "+i+" | "+indeks);
				// }
				temp += (sv.alpha * sv.kelas * kernel[sv.dokIndeks][i]);
			});
			// console.log(temp);
			temp += individu.beta;
			// console.log(temp);
			if (temp >= 0) {
				result.push(1);
			}
			else
				result.push(-1);
		}
		return result;
	}

	akurasi(individu, kernel, kernelParam, termPresence, dokumen){		
		if (termPresence == undefined || dokumen == undefined) {
			termPresence = this.getTermPresenceTraning();
			dokumen = this.getDokumenTraining();
		}
		// console.log(dokumen);
		var result = this.klasifikasi(individu, kernel, kernelParam, termPresence, dokumen.length);
		// console.log(result);
		// var correct = 0;
		var tp = 0;
		var tn = 0;
		var fp = 0;
		var fn = 0;
		// var count = 0;
		dokumen.map(function(dok, indeks){
			// if (result[indeks] != dok.kelas) {
			// 	count++;				
			// 	console.log(result[indeks]+" | "+dok.kelas+" | "+indeks+" || "+dok.term);
			// }
			// (dok.kelas == result[indeks])?correct++:correct+=0;
			if (result[indeks] == 1 && dok.kelas == 1) {
				tp++;
			}
			if (result[indeks] == 1 && dok.kelas == -1) {
				fn++;
			}
			if (result[indeks] == -1 && dok.kelas == 1) {
				fp++;
			}
			if (result[indeks] == -1 && dok.kelas == -1) {
				tn++;
			}
		});
		// console.log(count);

		// individu.akurasi = correct/dokumen.length*100;
		individu.akurasi = (tp+tn)/(tp+tn+fp+fn) * 100;
		return individu;
	}

}

module.exports = Svm;