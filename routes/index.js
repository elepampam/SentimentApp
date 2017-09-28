var express = require('express');
var extend = require('util')._extend;
var path = require('path');
var router = express.Router();
var fs = require('fs');
var csv = require('fast-csv');
var formidable = require('formidable');
var akarata = require('akarata');
var Algen = require('../logic/Algen');
var Svm = require('../logic/Svm');
var Preprocessing = require('../logic/Preprocessing');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: algen.getPopSize() });
});

//inisialisasi page
router.get('/inisialisasi', function(req, res, next) {

});

router.get('/dataset', function(req, res, next) {
    res.render('manajemendataset');
});

router.get('/training', function(req, res, next) {
    res.render('svmgapage');
});

router.get('/alay', function(req, res, next) {
    var pre = new Preprocessing();
    var kamusAlay = pre.getKamusAlay();
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/alay.csv");
    writableStream.on("finish", function(){
        console.log("DONE writing chromosome!");
    });
    csvStream.pipe(writableStream);
    for (var i = 0; i < kamusAlay.length; i++) {
        kamusAlay[i].kata.map(function(alay){
            csvStream.write([alay, kamusAlay[i].baku]);
            console.log("write");
        });
    }
    
    csvStream.end();
});

router.get('/stopword', function(req, res, next) {
    var pre = new Preprocessing();
    var stopword = pre.getStopword();
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/stopword.csv");
    writableStream.on("finish", function(){
        console.log("DONE writing chromosome!");
    });
    csvStream.pipe(writableStream);
    for (var i = 0; i < stopword.length; i++) {
        csvStream.write([stopword[i]]);
    }
    
    csvStream.end();
});

router.get('/testing', function(req, res, next) {
	res.render('testingpage');
});

router.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '../logic/data');

    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, 'dataTraining.csv'));
    });

    form.on('error', function(err) {
        console.log('error :' + err);
    });

    form.on('end', function() {
    	console.log('success');
        res.send('success');
    });

    form.parse(req);
});

router.post('/uploadTesting', function(req, res) {
    var form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '../logic/data');

    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, 'dataTesting.csv'));
    });

    form.on('error', function(err) {
        console.log('error :' + err);
    });

    form.on('end', function() {
        res.send('success');
    });

    form.parse(req);
});

router.post('/train', function(req, res) {   
    //input dari user
    var data = JSON.stringify(req.body);
    data = JSON.parse(data);
    console.log(data);

    training(data, function(populasi) {
        res.send(populasi);
        // console.log(populasi);
    });

});

function training(data, callback) {
    var algen = new Algen();
    readFitur(function(term) {
        var fiture = term; // geti fiture
        readTermPresence(function(tp) {
            var termPresence = tp; //get term presence
            readDokumenTraining(function(dokTraining) {
                var dokumenTraining = dokTraining; //get dokumen training
                var svm = new Svm(termPresence, dokTraining);                
           //      var populasi = [];
           //      populasi[0] = {
           //      	chromosome:fiture,
			        // alpha:[],
			        // beta:0,
			        // akurasi:0,
			        // flag:1
           //      };
           		if (data.populasi != undefined) {
           			algen.setPopulasi(data.populasi);
           		}
           		else{
           			algen.inisialisasi(fiture, data.input.popSize);
           		}      
                while (data.input.maxIterAlgen > data.input.target) {
                    console.log("iterasi algen: "+data.input.maxIterAlgen);
                	algen.resetAlphaB(algen.getPopulasi());
                    // console.log(algen.getPopulasi(0).alpha);                   
                    algen.reproduksi(data.input.popSize, data.input.crossoverRate);
                    console.log("---training populasi---");
                    algen.getPopulasi().map(function(individu, indeks) {                        
                        console.log("parent ke-"+indeks);
                        svm.train(algen.getPopulasi(indeks), data.input.kernel,data.input.kernelParam, data.input.maxIterSVM);
                        svm.akurasi(algen.getPopulasi(indeks), data.input.kernel,data.input.kernelParam);
                    });
                    console.log("---training offspring---");
                    algen.getOffspring().map(function(offspring, indeks) {                    
                        console.log("offspring ke-"+indeks);
                        svm.train(algen.getOffspring(indeks), data.input.kernel, data.input.kernelParam, data.input.maxIterSVM);
                        svm.akurasi(algen.getOffspring(indeks), data.input.kernel,data.input.kernelParam);
                     });
                    // svm.train(algen.getPopulasi(),2,data.input.maxIterSVM);
                    // svm.akurasi(algen.getPopulasi());
                    algen.elitsm()                                        
                    data.input.maxIterAlgen--;                                       
                }
                var result = svm.klasifikasi(algen.getPopulasi(0),  data.input.kernel, data.input.kernelParam, termPresence, dokTraining.length);
                
                updateDokumenTraining(dokTraining, result, function(tempDokTraining){
                	updateDokTraining(tempDokTraining);
                });
				// svm.train(populasi[0], 2, data.input.maxIterSVM);
    			// svm.akurasi(populasi[0]);
    			if (data.input.maxIterAlgen == 0) {
    				writeChromosome(algen.getPopulasi(0), data.input.kernel, data.input.kernelParam);
    			}                
                var dataCallback = {};
                dataCallback.input = data.input;
                dataCallback.populasi = algen.getPopulasi();
                callback(dataCallback);
                // callback(populasi);
            });
        });
    });
}


router.get('/test', function(req, res) {  
    var pre = new Preprocessing();
    var data = {};
    readTermPresence(function(tp) {
    var termPresence = tp; //get term presence Training
        readDokumenTraining(function(dokTraining) {
            var dokumenTraining = dokTraining; //get dokumen training
            var svm = new Svm(termPresence, dokTraining);
            readDataTesting(function(dataTesting) {                        
                for (var i = 0; i < dataTesting.length; i++) {
                    dataTesting[i] = pre.tokenizing(dataTesting[i]);
                    dataTesting[i] = pre.normalisasi(dataTesting[i]);
                    dataTesting[i] = pre.filtering(dataTesting[i]);
                    dataTesting[i] = pre.stemming(dataTesting[i]);
                }                  
                readChromosome(function(individu){                	
                	var termPresenceTesting = hitungTermPresence(individu.chromosome, dataTesting);     
                    console.log(termPresenceTesting);
                    data.result = svm.klasifikasi(individu, individu.kernel, individu.kernelParam, termPresenceTesting, dataTesting.length);
                    for (var i = 0; i < data.result.length; i++) {
                    	dataTesting[i].result = data.result[i];
                    }
                    // console.log(dataTesting);
                    writeDokTesting(dataTesting);
                    data = akurasiTesting(data, dataTesting);
                    res.send(JSON.stringify(data));
                });                
            });                            
        });
    });    
});

function writeDokTesting(dokumen){    
	// console.log(dokumen);
    var csvStream = csv.createWriteStream(),
    writableStream = fs.createWriteStream("logic/data/dokTesting.csv");
    writableStream.on("finish", function(){
        console.log("DONE!");
    });
    csvStream.pipe(writableStream);
    for (var i = 0; i < dokumen.length; i++) {
         csvStream.write([i, dokumen[i].Tweet, dokumen[i].Acara, dokumen[i].Kelas, dokumen[i].result]);    
    }
    csvStream.end();
}

function akurasiTesting(data, dokTesting){
    data.keterangan = [];
    var tp = 0;
    var tn = 0;
    var fp = 0;
    var fn = 0;
    dokTesting.map(function(dok, indeks){   
        if (data.result[indeks] == 1 && dok.Kelas == 1) {
            tp++;
            data.keterangan.push("TP");
        }
        if (data.result[indeks] == 1 && dok.Kelas == -1) {
            fn++;
            data.keterangan.push("FN");
        }
        if (data.result[indeks] == -1 && dok.Kelas == 1) {
            fp++;
            data.keterangan.push("FP");
        }
        if (data.result[indeks] == -1 && dok.Kelas == -1) {
            tn++;
            data.keterangan.push("TN");
        }    
    });
    data.akurasi = (tp+tn)/(tp+tn+fp+fn) * 100;
    return data;
}


router.get('/preprocessing', function(req, res, next){
    res.render('preprocessing');
});

router.get('/rating', function(req, res, next){
	readAcara(function(acara){
		res.render('rating', { acaras : acara});
	});    
});

router.get('/ratetv', function(req, res, next){
	var rating = {};
	rating.top = 0;
	rating.dt = 0;
	rating.al = 0;
	rating.bc = 0;		
	readDokumenTraining(function(dokTraining){
		readDokumenTesting(function(dokTesting){			
			dokTraining.map(function(dok){
				dok.acara = dok.acara.toLowerCase();
				if (dok.result == 1) {
					if (dok.acara == 'tukang ojek pengkolan') {
						rating.top++;
					}
					else if (dok.acara == 'dunia terbalik') {
						rating.dt++;
					}
					else if (dok.acara == "anak langit") {
						rating.al++;
					}
					else if (dok.acara == 'berkah cinta') {
						rating.bc++;
					}
				}
			});
			dokTesting.map(function(dok){
				if (dok.result == 1) {
					if (dok.acara == 'tukang ojek pengkolan') {
						rating.top++;
					}
					else if (dok.acara == 'dunia terbalik') {
						rating.dt++;
					}
					else if (dok.acara == "anak langit") {
						rating.al++;
					}
					else if (dok.acara == 'berkah cinta') {
						rating.bc++;
					}
				}
			});
			console.log(rating);
			rating.top = rating.top / (dokTraining.length + dokTesting.length) * 10 *2;
			rating.bc = rating.bc / (dokTraining.length + dokTesting.length) * 10 *2;
			rating.dt = rating.dt / (dokTraining.length + dokTesting.length) * 10 *2;
			rating.al = rating.al / (dokTraining.length + dokTesting.length) * 10 *2;			
			console.log(rating);
			res.send(JSON.stringify(rating));
		});
	});
});

router.post('/pre', function(req, res, next) {
    var pre = new Preprocessing();
    var data = {};
    readDataTraining(function(dataTraining) {        
        data.dataTraining = JSON.parse(JSON.stringify(dataTraining));
        var token = [];
        var norm = [];
        var filter = [];
        var stem = [];
        for (var i = 0; i < data.dataTraining.length; i++) {
            token.push(pre.tokenizing(dataTraining[i]));                           
        }
        console.log("Preprocessing : tokenizing");
        data.token = JSON.parse(JSON.stringify(token));

        for (var i = 0; i < token.length; i++) {
            norm.push(pre.normalisasi(token[i]));                        
        }
        console.log("Preprocessing : normalisasi");
        data.norm = JSON.parse(JSON.stringify(norm));
        for (var i = 0; i < norm.length; i++) {
            filter.push(pre.filtering(norm[i]));                        
        }
        console.log("Preprocessing : filtering");
        data.filter = JSON.parse(JSON.stringify(filter));
        for (var i = 0; i < filter.length; i++) {
            stem.push(pre.stemming(filter[i]));
        }
        console.log("Preprocessing : stemming");
        data.stem = JSON.parse(JSON.stringify(stem));
        var fiture = collectTerm(stem);
        data.fiture = JSON.parse(JSON.stringify(fiture));
        console.log("Preprocessing : collecting term");
        writeFiture(fiture);

        var termPresence = hitungTermPresence(fiture, stem);        
        console.log("writing vector term presence");
        writeTermpresence(termPresence);        
        writeDokTraining(data.stem);
        res.send(JSON.stringify(data));
    });    
});

function readDataTraining(callback) {
    var stream = fs.createReadStream('logic/data/dataTraining.csv');
    var dataTraining = [];
    var streamFiture = csv({ headers: true })
        .on("data", function(data) {
            dataTraining.push(data);
            // console.log(data);
        })
        .on("end", function() {
            callback(dataTraining);
            // console.log(dataTraining[0].Tweet);
        });
    stream.pipe(streamFiture);
}

function readAcara(callback) {
    var stream = fs.createReadStream('logic/data/ratingtv.csv');
    var acara = [];
    var streamAcara = csv({ headers: true })
        .on("data", function(data) {
            acara.push(data);
            // console.log(data);
        })
        .on("end", function() {
            callback(acara);
            // console.log(dataTraining[0].Tweet);
        });
    stream.pipe(streamAcara);
}

function readDataTesting(callback) {
    var stream = fs.createReadStream('logic/data/dataTesting.csv');
    var dataTraining = [];
    var streamFiture = csv({ headers: true })
        .on("data", function(data) {
            dataTraining.push(data);
            // console.log(data);
        })
        .on("end", function() {
            callback(dataTraining);
            // console.log(dataTraining[0].Tweet);
        });
    stream.pipe(streamFiture);
}


function updateDokumenTraining(dokTraining, result, callback){
	for (var i = 0; i < result.length; i++) {
    	dokTraining[i].result = result[i];
    	// console.log(dokTraining[i].Result);
	}
	callback(dokTraining);
	// console.log("kelas"+dokTraining[0].Result);

}

function readFitur(callback) {
    var stream = fs.createReadStream('logic/data/fiture.csv');
    var fiture = [];
    var streamFiture = csv()
        .on("data", function(term) {
            fiture.push(term.pop());
        })
        .on("end", function() {
            callback(fiture);
        });
    stream.pipe(streamFiture);
}

function readTermPresence(callback) {
    var stream = fs.createReadStream('logic/data/termPresence.csv');
    var temp = {};
    var csvStream = csv()
        .on("data", function(data) {
            temp[data[0]] = [];
            var tp = data[1].split(",").map(Number);
            tp.map(function(val) {
                temp[data[0]].push(val);
            });
        })
        .on("end", function() {
            callback(temp);
        });
    stream.pipe(csvStream);
}

function readChromosome(callback) {
    var stream = fs.createReadStream('logic/data/chromosome.csv');
    var temp = {};
    var csvStream = csv()
        .on("data", function(data) {      
            if (data[0] == "chromosome") {
                temp[data[0]] = [];
                var tp = data[1].split(",");
                tp.map(function(val) {
                    temp[data[0]].push(val);
                });     
            }
            else if (data[0] == "alpha") {
                 temp[data[0]] = [];
                var tp = data[1].split(",").map(Number);
                tp.map(function(val) {
                    temp[data[0]].push(val);
                });
            }
            else{
                temp[data[0]] = Number(data[1]);
            }            
        })
        .on("end", function() {
            callback(temp);
        });
    stream.pipe(csvStream);
}

function readDokumenTraining(callback) {
    var stream = fs.createReadStream('logic/data/dokTraining.csv');
    var dok = [];
    var csvStream = csv()
        .on('data', function(data) {
        	if (data[4] != undefined) {
        		dok.push({ 'term': data[1].split(','), 'acara': data[2],'kelas': data[3], 'result': data[4]});
        	}else{
        		dok.push({ 'term': data[1].split(','), 'acara': data[2],'kelas': data[3] });
        	}            
        })
        .on('end', function() {
            // console.log('---done--');
            callback(dok);
        });
    stream.pipe(csvStream);
}

function readDokumenTesting(callback) {
    var stream = fs.createReadStream('logic/data/dokTesting.csv');
    var dok = [];
    var csvStream = csv()
        .on('data', function(data) {
            if (data[4] != undefined) {
        		dok.push({ 'term': data[1].split(','), 'acara': data[2],'kelas': data[3], 'result': data[4]});
        	}else{
        		dok.push({ 'term': data[1].split(','), 'acara': data[2],'kelas': data[3] });
        	}            
        })
        .on('end', function() {
            // console.log('---done--');
            callback(dok);
        });
    stream.pipe(csvStream);
}

function writeDokTraining(dokumenTraining){    
    var csvStream = csv.createWriteStream(),
    writableStream = fs.createWriteStream("logic/data/dokTraining.csv");
    writableStream.on("finish", function(){
        console.log("DONE!");
    });
    csvStream.pipe(writableStream);
    for (var i = 0; i < dokumenTraining.length; i++) {
         csvStream.write([i, dokumenTraining[i].Tweet, dokumenTraining[i].Acara, dokumenTraining[i].Kelas]);    
    }
    csvStream.end();
}

function updateDokTraining(dokumenTraining){    
	// console.log(dokumenTraining);
    var csvStream = csv.createWriteStream(),
    writableStream = fs.createWriteStream("logic/data/dokTraining.csv");
    writableStream.on("finish", function(){
        console.log("DONE update dok training!");
    });
    csvStream.pipe(writableStream);
    for (var i = 0; i < dokumenTraining.length; i++) {
         csvStream.write([i, dokumenTraining[i].term, dokumenTraining[i].acara, dokumenTraining[i].kelas, dokumenTraining[i].result]);    
    }
    csvStream.end();
}

function writeFiture(fiture){
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/fiture.csv");
    writableStream.on("finish", function(){
        console.log("DONE fiture!");
    });
    csvStream.pipe(writableStream);
    fiture.map(function(term){
        csvStream.write([term]);
    })
    // for (var fiture in fiture) {
    //     csvStream.write([fiture, termPresence[fiture]]);    
    // }
    csvStream.end();
}

function writeTermpresence(termPresence){
    // console.log(termPresence);
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/termPresence.csv");
    writableStream.on("finish", function(){
        console.log("DONE TP!");
    });
    csvStream.pipe(writableStream);
    for (var fiture in termPresence) {
        csvStream.write([fiture, termPresence[fiture]]);    
    }
    csvStream.end();
}

function writeTestingFiture(fiture){
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/testingFiture.csv");
    writableStream.on("finish", function(){
        console.log("DONE fiture!");
    });
    csvStream.pipe(writableStream);
    fiture.map(function(term){
        csvStream.write([term]);
    })
    // for (var fiture in fiture) {
    //     csvStream.write([fiture, termPresence[fiture]]);    
    // }
    csvStream.end();
}

function writeTestingTermpresence(termPresence){
    // console.log(termPresence);
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/testingTermPresence.csv");
    writableStream.on("finish", function(){
        console.log("DONE TP!");
    });
    csvStream.pipe(writableStream);
    for (var fiture in termPresence) {
        csvStream.write([fiture, termPresence[fiture]]);    
    }
    csvStream.end();
}

function writeChromosome(chromosome, kernel, kernelParam){
    // console.log(termPresence);
    var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("logic/data/chromosome.csv");
    writableStream.on("finish", function(){
        console.log("DONE writing chromosome!");
    });
    csvStream.pipe(writableStream);
    for (var indeks in chromosome) {
        csvStream.write([indeks, chromosome[indeks]]);    
    }
    csvStream.write(['kernel', kernel]);  
    csvStream.write(['kernelParam', kernelParam]);  
    csvStream.end();
}

function collectTerm(dokumen){
    var fiture = [];
    // console.log(dokumen);
    dokumen.map(function(dokumen){
    dokumen.Tweet = dokumen.Tweet.split(" ");
    dokumen.Tweet.map(function(term){        
         if (fiture.indexOf(term) == -1) {
             fiture.push(term);
         }
     });
    });
    return fiture;
}

function hitungTermPresence(fiture, dokumen){
    var termPresence = [];

    for (var i = 0; i < fiture.length; i++) {
        termPresence[fiture[i]] = [];
        for (var j = 0; j < dokumen.length; j++) {
            if (dokumen[j].Tweet.indexOf(fiture[i]) == -1 ) {
                termPresence[fiture[i]].push(0);
            }
            else
                termPresence[fiture[i]].push(1);
        }
    }
    return termPresence;
}

module.exports = router;