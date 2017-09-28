class Algen{
	constructor(){
		var crossoverRate = 0.2;
		var maxIterAlgen = 10; //default algen max iteration
		var _populasi = [];
		var _offspring = [];
		var _popSize = 5; //default popsize
		this.getPopulasi = function(indeks){			
			if (indeks != undefined) {
				return _populasi[indeks];
			}
			else{
				return _populasi;
			}
		};
		this.setPopulasi = function(populasi){
			_populasi = populasi;
		};
		this.getPopSize = function(){
			return _popSize;
		}
		this.setPopSize = function(popSize){
			_popSize = popSize;
		}
		this.getCrossoverRate = function(){
			return crossoverRate;
		}
		this.setOffspring = function(offspring){
			_offspring = offspring;
		}
		this.getOffspring = function(indeks){
			if (indeks != undefined) {
				return _offspring[indeks];
			}
			else{
				return _offspring;
			}
		}
		this.resetAlphaB = function(kumpulan){
			kumpulan.map(function(individu){
				individu.alpha = [];
				individu.beta = 0;
			})
		}
	}

	inisialisasi(fiture, popSize = this.getPopSize()) {
	    if (popSize > 0) {
	        var populasi = [];
	        for (var i = 0; i < popSize; i++) {
	            var chromosomeLength = Math.random() * (fiture.length - 4) + 4;
	            var chromosome = [];
	            for (var j = 0; j < chromosomeLength; j++) {
	                var indeksTerm = Math.round(Math.random() * (fiture.length - 1 - 0) + 0);
	                while (chromosome.indexOf(fiture[indeksTerm]) != -1) {
	                    indeksTerm = Math.round(Math.random() * (fiture.length - 1 - 0) + 0);
	                }
	                var temp = fiture[indeksTerm];
	                // console.log(temp);
	                chromosome.push(temp);
	            }
	            populasi[i] = {
	                chromosome: chromosome,
	                alpha: [],
	                beta: 0,
	                akurasi: 0,
	                flag: 0
	            }
	        };
        	this.setPopulasi(populasi);
        	this.setPopSize(popSize);
	    } else
	        console.log("popSize minimal adalah 1!"+ popSize);
	}

	oneCutCrossover(parent1, parent2) {
		// console.log("crossover");
		// console.log("1"+parent1);
		// console.log("2"+parent2);
    	var cutIndeks = Math.round(Math.random() * ((parent1.length > parent2.length ? parent2.length : parent1.length) - 1 - 1) + 1);
    	// console.log('cutindeks: '+cutIndeks);
	    var child = [];
	    child[0] = {
	        chromosome:[],
	        alpha:[],
	        beta:0,
	        akurasi:0,
	        flag:1
	    };
	    child[1] = {
	        chromosome:[],
	        alpha:[],
	        beta:0,
	        akurasi:0,
	        flag:1
	    };

	    for (var i = 0; i < cutIndeks; i++) {
	        child[0].chromosome.push(parent1[i]);
	        child[1].chromosome.push(parent2[i]);        
	    }
	    for (var i = cutIndeks; i < parent2.length; i++) {
	        child[0].chromosome.push(parent2[i]);	        
	    }
	    for (var i = cutIndeks; i < parent1.length; i++) {
	    	child[1].chromosome.push(parent1[i]);
	    }
	    return child;
	}

	reproduksi(populasi = this.getPopulasi().length, crossoverRate = this.getCrossoverRate()){
		console.log('reproduksi...');
		var offspring = [];
		var jumlahOffspring = Math.round(populasi * crossoverRate);
		// console.log(jumlahOffspring);
		var parent1, parent2;
		while(jumlahOffspring > 0){
			// console.log(jumlahOffspring);
			parent1 = Math.round(Math.random() * (populasi - 1));
			parent2 = Math.round(Math.random() * (populasi - 1));
			// console.log("p1"+parent1);
			// console.log("p2"+parent2);
			while(parent1 == parent2){
				// console.log(true);
				parent2 = Math.round(Math.random() * (populasi - 1));
			}			
			this.oneCutCrossover(this.getPopulasi(parent1).chromosome, this.getPopulasi(parent2).chromosome).map(function(temp){
				if (jumlahOffspring > 0) {
					offspring.push(temp);
					// console.log(temp);
					jumlahOffspring--;
				}				
			});			
		}
		this.setOffspring(offspring);
	}

	elitsm(populasi = this.getPopulasi(), offspring = this.getOffspring()){
		var temp;
		for (var i = 0; i < populasi.length; i++) {
			for (var j = i+1; j < populasi.length; j++) {
				if (populasi[i].akurasi < populasi[j].akurasi) {										
					temp = populasi[i];
					populasi[i] = populasi[j];
					populasi[j] = temp;
				}
			}
		}

		for (var i = 0; i < populasi.length; i++) {
			for (var j = 0; j < offspring.length; j++) {
				if (populasi[i].akurasi < offspring[j].akurasi) {
					temp = populasi[i];
					populasi[i] = offspring[j];
					offspring[j] = temp;
				}
			}
		}
		this.setPopulasi(populasi);		
	}
}

module.exports = Algen;