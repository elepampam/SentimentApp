class Preprocessing{	
	constructor(){
		var kamusAlay = [{
			    'kata': ['wooi'],
			    'baku': 'woi'
			}, {
			    'kata': ['ttp'],
			    'baku': 'tetap'
			}, {
			    'kata': ['yg'],
			    'baku': 'yang'
			}, {
			    'kata': ['ch'],
			    'baku': 'sih'
			}, {
			    'kata': ['d'],
			    'baku': 'di'
			}, {
			    'kata': ['psangin'],
			    'baku': 'pasangin'
			}, {
			    'kata': ['ma',"sm", "sma"],
			    'baku': 'sama'
			}, {
			    'kata': ['ga', 'nggak', 'gak', 'gk', 'gx', 'gag', 'ngg', "tidak", "ngga","kgk"],
			    'baku': 'tidak'
			}, {
			    'kata': ['haddeeh', "aduhhh", "aduhh"],
			    'baku': 'aduh'
			}, {
			    'kata': ['ni', "nie"],
			    'baku': 'ini'
			}, {
			    'kata': ['sinet'],
			    'baku': 'sinetron'
			}, {
			    'kata': ['trz','trs',"muluk"],
			    'baku': 'terus'
			}, {
			    'kata': ['byk', 'bnyk', 'baxk', 'bnyak', "buaannnnyyyyaaakkkkk"],
			    'baku': 'banyak'
			}, {
			    'kata': ['hayalanxn'],
			    'baku': 'hayalannya'
			}, {
			    'kata': ['mantab', 'cihuy', "mantaf","klopp"],
			    'baku': 'mantap'
			}, {
			    'kata': ['wk', 'hehee', 'haha', 'hhe', 'wkwkwk', 'kwkwk','hahaha','wkwkwkwkw','hahah','hahaaa',"lucuu", "wkwk", "pedeut","hahhahaha"],
			    'baku': 'lucu'
			}, {
			    'kata': ['klo', 'kalo', 'klo'],
			    'baku': 'kalau'
			}, {
			    'kata': ['acarane', 'acra'],
			    'baku': 'acara'
			}, {
			    'kata': ['krn'],
			    'baku': 'karena'
			}, {
			    'kata': ['blm'],
			    'baku': 'belum'
			}, {
			    'kata': ['lht', 'liat'],
			    'baku': 'lihat'
			}, {
			    'kata': ['mb', 'mba'],
			    'baku': 'mbak'
			}, {
			    'kata': ['chantik'],
			    'baku': 'cantik'
			}, {
			    'kata': ['tuuhh'],
			    'baku': 'cantik'
			}, {
			    'kata': ['jd', 'jdi'],
			    'baku': 'jadi'
			}, {
			    'kata': ['adlh'],
			    'baku': 'adalah'
			}, {
			    'kata': ['ad'],
			    'baku': 'ada'
			}, {
			    'kata': ['sm'],
			    'baku': 'sama'
			}, {
			    'kata': ['tmn'],
			    'baku': 'teman'
			}, {
			    'kata': ['cwe'],
			    'baku': 'cewek'
			}, {
			    'kata': ['critax'],
			    'baku': 'ceritanya'
			}, {
			    'kata': ['baruy'],
			    'baku': 'barunya'
			}, {
			    'kata': ['sebntar', 'sbntar'],
			    'baku': 'sebentar'
			}, {
			    'kata': ['n'],
			    'baku': 'dan'
			}, {
			    'kata': ['karna'],
			    'baku': 'karena'
			}, {
			    'kata': ['mlm'],
			    'baku': 'malam'
			}, {
			    'kata': ['kemalman'],
			    'baku': 'kemalaman'
			}, {
			    'kata': ['pengen', "pingin"],
			    'baku': 'ingin'
			}, {
			    'kata': ['ngelucu'],
			    'baku': 'melucu'
			}, {
			    'kata': ['tuh'],
			    'baku': 'itu'
			}, {
			    'kata': ['bgt', 'pisan', 'bngt',"binggo","bangetz"],
			    'baku': 'banget'
			}, {
			    'kata': ['mewekx'],
			    'baku': 'terharu'
			}, {
			    'kata': ['ajah', 'ajha', 'aja', 'aj'],
			    'baku': 'saja'
			}, {
			    'kata': ['smoga'],
			    'baku': 'semoga'
			}, {
			    'kata': ['smpek', 'ampe'],
			    'baku': 'sampai'
			}, {
			    'kata': ['pling'],
			    'baku': 'paling'
			}, {
			    'kata': ['sukai','suka',"like","love"],
			    'baku': 'suka'
			}, {
			    'kata': ['dimnna','dimna'],
			    'baku': 'dimana'
			}, {
			    'kata': ['brcnda'],
			    'baku': 'bercanda'
			}, {
			    'kata': ['breng'],
			    'baku': 'bareng'
			},{
			    'kata': ['abis'],
			    'baku': 'habis'
			}, {
			    'kata': ['bs'],
			    'baku': 'bisa'
			}, {
			    'kata': ['emang'],
			    'baku': 'memang'
			}, {
			    'kata': ['selsai'],
			    'baku': 'selesai'
			}, {
			    'kata': ['nnton', 'nntn', 'nontonya', "ntn"],
			    'baku': 'nonton'
			}, {
			    'kata': ['cos'],
			    'baku': 'karena'
			}, {
			    'kata': ['seneng'],
			    'baku': 'senang'
			}, {
			    'kata': ['full'],
			    'baku': 'penuh'
			}, {
			    'kata': ['uy'],
			    'baku': 'ya'
			}, {
			    'kata': ['kang', 'kak'],
			    'baku': 'kakak'
			}, {
			    'kata': ['pke'],
			    'baku': 'pakai'
			}, {
			    'kata': ['prnah'],
			    'baku': 'pernah'
			}, {
			    'kata': ['ktinggalan'],
			    'baku': 'ketinggalan'
			}, {
			    'kata': ['lgi', 'lg'],
			    'baku': 'lagi'
			}, {
			    'kata': ['eps'],
			    'baku': 'episode'
			}, {
			    'kata': ['ngantuk', 'gntuk'],
			    'baku': 'kantuk'
			}, {
			    'kata': ['udah', 'sdh', "udh"],
			    'baku': 'sudah'
			}, {
			    'kata': ['ketiwi', 'ngakak'],
			    'baku': 'ketawa'
			}, {
			    'kata': ['swami'],
			    'baku': 'suami'
			}, {
			    'kata': ['mw'],
			    'baku': 'mau'
			}, {
			    'kata': ['mqin', 'maen'],
			    'baku': 'main'
			}, {
			    'kata': ['gara'],
			    'baku': 'akibat'
			}, {
			    'kata': ['skrg', 'skg','skarang',"sekrang"],
			    'baku': 'sekarang'
			}, {
			    'kata': ['makin', 'smakin'],
			    'baku': 'semakin'
			}, {
			    'kata': ['pnjang'],
			    'baku': 'panjang'
			}, {
			    'kata': ['min'],
			    'baku': 'admin'
			}, {
			    'kata': ['dnia'],
			    'baku': 'dunia'
			}, {
			    'kata': ['terblik'],
			    'baku': 'terbalik'
			}, {
			    'kata': ['koq', 'kox'],
			    'baku': 'kok'
			}, {
			    'kata': ['tyang'],
			    'baku': 'tayang'
			}, {
			    'kata': ['sy', 'q','i',"gw","gue","aku"],
			    'baku': 'saya'
			}, {
			    'kata': ['jga','jg'],
			    'baku': 'juga'
			}, {
			    'kata': ['seruu','seruuu', "serru", 'sipp'],
			    'baku': 'seru'
			}, {
			    'kata': ['tamte'],
			    'baku': 'tante'
			}, {
			    'kata': ['udahan'],
			    'baku': 'berakhir'
			}, {
			    'kata': ['y', 'nya'],
			    'baku': 'nya'
			}, {
			    'kata': ['favoritku', "lovers"],
			    'baku': 'favorit aku'
			}, {
			    'kata': ['drpd'],
			    'baku': 'daripada'
			}, {
			    'kata': ['bosen', 'najis', "njs","bosennn","bete"],
			    'baku': 'bosan'
			}, {
			    'kata': ['moment'],
			    'baku': 'momen'
			}, {
			    'kata': ['saudra'],
			    'baku': 'saudara'
			}, {
			    'kata': ['td'],
			    'baku': 'tadi'
			}, {
			    'kata': ['best'],
			    'baku': 'keren'
			}, {
			    'kata': ['jlas'],
			    'baku': 'jelas'
			}, {
			    'kata': ['dgn', "dg"],
			    'baku': 'dengan'
			}, {
			    'kata': ['brwarna'],
			    'baku': 'berwarna'
			}, {
			    'kata': ['lbh','lbih'],
			    'baku': 'lebih'
			}, {
			    'kata': ['dpsngn'],
			    'baku': 'dipasangin'
			}, {
			    'kata': ['msk'],
			    'baku': 'masak'
			}, {
			    'kata': ['tayng'],
			    'baku': 'tayang'
			}, {
			    'kata': ['nyesel'],
			    'baku': 'sesal'
			}, {
			    'kata': ['bosen'],
			    'baku': 'bosan'
			}, {
			    'kata': ['ok'],
			    'baku': 'oke'
			}, {
			    'kata': ['males'],
			    'baku': 'malas'
			}, {
			    'kata': ['ngomong'],
			    'baku': 'omong'
			}
			, {
			    'kata': ['smpe'],
			    'baku': 'sampai'
			}, {
			    'kata': ['bales'],
			    'baku': 'balas'
			}, {
			    'kata': ['nangis'],
			    'baku': 'tangis'
			}, {
			    'kata': ['bosennya',"ngebosenin","ngebosanin"],
			    'baku': 'membosankan'
			}, {
			    'kata': ['nyebelin'],
			    'baku': 'menyebalkan'
			}, {
			    'kata': ['ngabisin'],
			    'baku': 'menghabiskan'
			}, {
			    'kata': ['kelarnya'],
			    'baku': 'selesainya'
			}, {
			    'kata': ['balikin'],
			    'baku': 'kembali'
			}, {
			    'kata': ['kebanyakan'],
			    'baku': 'banyak'
			}, {
			    'kata': ['genk'],
			    'baku': 'geng'
			}, {
			    'kata': ['kelicikan'],
			    'baku': 'licik'
			}, {
			    'kata': ['aplgi'],
			    'baku': 'apalagi'
			}, {
			    'kata': ['mpok',"bu"],
			    'baku': 'ibu'
			}, {
			    'kata': ['jgn', "jngn"],
			    'baku': 'jangan'
			}, {
			    'kata': ['siaranya'],
			    'baku': 'siaran'
			}, {
			    'kata': ['ngulang'],
			    'baku': 'ulang'
			}, {
			    'kata': ['sbg'],
			    'baku': 'sebagai'
			}, {
			    'kata': ['utk', "buat", "untk"],
			    'baku': 'untuk'
			}, {
			    'kata': ['kepetingannya'],
			    'baku': 'kepentingan'
			}, {
			    'kata': ['memanfaatkan'],
			    'baku': 'manfaat'
			}, {
			    'kata': ['dech'],
			    'baku': 'deh'
			}, {
			    'kata': ['kesel'],
			    'baku': 'sebal'
			}, {
			    'kata': ['punyaa'],
			    'baku': 'punya'
			}, {
			    'kata': ['ojeg'],
			    'baku': 'ojek'
			}, {
			    'kata': ['jln'],
			    'baku': 'jalan'
			}, {
			    'kata': ['sini'],
			    'baku': 'kesini'
			}, {
			    'kata': ['dlm'],
			    'baku': 'dalam'
			}, {
			    'kata': ['rmh', 'dirmh'],
			    'baku': 'rumah'
			}, {
			    'kata': ['org'],
			    'baku': 'orang'
			}, {
			    'kata': ['tuany'],
			    'baku': 'tuanya'
			}, {
			    'kata': ['ngacoh'],
			    'baku': 'kacau'
			}, {
			    'kata': ['yaaaa'],
			    'baku': 'ya'
			}, {
			    'kata': ['gajelas'],
			    'baku': 'tidak jelas'
			}, {
			    'kata': ['goblokkkk'],
			    'baku': 'bodoh'
			}, {
			    'kata': ['bapper'],
			    'baku': 'baper'
			}, {
			    'kata': ['gokill'],
			    'baku': 'seru'
			}, {
			    'kata': ['brrat'],
			    'baku': 'berat'
			}, {
			    'kata': ['ati'],
			    'baku': 'hati'
			}, {
			    'kata': ['dngering'],
			    'baku': 'dengar'
			}, {
			    'kata': ['tar'],
			    'baku': 'nanti'
			}, {
			    'kata': ['pokeknye'],
			    'baku': 'pokoknya'
			}, {
			    'kata': ['semoge'],
			    'baku': 'semoga'
			}, {
			    'kata': ['pemenangnye'],
			    'baku': 'menang'
			}, {
			    'kata': ['indosia'],
			    'baku': 'indonesia'
			}, {
			    'kata': ['sponsor'],
			    'baku': 'iklan'
			}, {
			    'kata': ['dunk','donk'],
			    'baku': 'dong'
			}, {
			    'kata': ['kocak'],
			    'baku': 'lucu'
			}, {
			    'kata': ['x'],
			    'baku': 'nya'
			}, {
			    'kata': ['kurang'],
			    'baku': 'tidak'
			}, {
			    'kata': ['jengkel'],
			    'baku': 'tidak suka'
			}];

		var stopword = ["dalam","jatuh","didorong","begitu","punya","iya","awal","tetap","ketika","ngasih","pokonya","tiba","abisan","yuhuu","ditunggu","tolong","kalau","setelah","yang","sebelumnya","terima","kasih","lagi","woi","kok","tukang","ojek","pengkolan","rcti","bareng","deh","di","e","acara","mbak","ratna","ini","jadi","karena","lihat","cemburu","bang","ojak","baru","cewek","nya","hari","episode","aku","wah","ya","nobar","jiwa","itu","harus","fisik","seseorang","habis","maghrib","memang","paling","nonton","dan","memang","menceritakan","kehidupan","sehari","semoga","melihat","kontrol","apalagi","mereka","ber","sudah","bersatu","mukenanya","kakak","dedeh","pakai","banyak","acengnya","ke","aceng","resep","bersambungnya","juga","ka","venus","pak","andika","daripada","uplek","rumah","tama","besok","sayang","aduh","sinetron","semakin","kesini","isinya","amp","kontrak","kerja","masa","dibaca","dulu","ahh","ihh","sih","mau","malah","bikin","yee","eros","kerjanya","katanya","mau","in","tania","ibel","le","mineral","diminum","sama","pasangan","bin","cuy","bakal","trsgara","dong","dikit","skenarionya","bik","sumi","sampe","jatuh.ketika","tante","lolita","tau","al","adalah","anak","kandungnya","yaa","tinggal","andra","nih","belum","siapa","cerita","lebih","dong","gan","kerubutin","masih","tetep","menang","orang","atau","dewa","pernah","sctv","demam","kali","siaran","bisa","ubah","berantem","momen","langit","saya","pas","scene","dimana","saudara","kumpul","dari","tadi","erostaniatama","saja","melulu","kirain","pokoknya","duh","ikutikutan","sendiri","bc","tamtan","kamis","ih","ceritanya","genk","antraks","antrax","dibabat","apaan","geng","rainbow","di","trus","dihajar","mulu","dikalahin","you","asli","gapapa","trlalu","ceritanya","ah","pasti","ada","si","boy","perannya","dengan","adanya","gio","dipasangin","mulukarakter","dehh","mulai","wajahmu","nongol","cuma","satu","sedikit","masangin","masak","hito","pasangin","raya","seharian","tayangan","melepas","uhhh","sinetronseru","oooooooooooo","minggu","boleh","jemput","apa","idoy","dunia","terbalik","sekarang","a","rt","dah","soal","duluan","tapi","nungguin","main","filmnya","berapa","adegan","bos","akibat","sampai","admin","dkk","ko","suami","darisitu","gua","sampe","ratusan","terus"," officialrcti","ny","brubah","akan","coba","m","dibuat","mendingan","officialrcti","kemana","pada","pemain","ibu","meninggal","tati","makin","atuh","cucu","jangan", "mama", "jelas", "sebagai", "kandung", "sering", "untuk","lalu","ane", "teman", 'secangkir',"kopi", "ngemil", "biskuit","legend","hah", "selalu", 'wow', "para","jalan", "masuk", "helm", "pasang","sin", "hhh", "ni" ,"anugrah","akum","dadang","saat","guru","yola","cumi","udang","vika", "emon","tim","raimbo","antar","balap","kata","tari","jauh","uhh","tuh","biasa","ammar","zoni","pemeran","immanuel","caesar","hito","indonesia","no","edoy","_","terbalik","berkah", "tukang","terlalu"];
		var kata_dasar = ["iklan","jangan","ulang","bosan","enak","tonton","top","suka","oke","mantap","lucu","sedih","puas","lama","teman","sabar","hebat","tidak","seru","ingin","garing","sukses","ribu","lucu","sip","keren","senang","penuh","asik","kantuk","hilang","ketawa","tentu","malas","sponsor","sebentar","ekspresi","keselek","camilan","omong","tayang","sampai","jam","selesai","siap","pecah","malam","banjir","air","mata","cocok","sambil","istirahat","lelah","awal","jeda","panjang","rumit","jasa","tegang","serang","balas","dendam","masuk","akal","kalah","aneh","bahagia","galau","macet","alay","tidur","penasaran","semangat","romantis","sumpah","emosi","program","favorit","rating","turun","isi", "perempuan","kejam","makan","hati","santai","enak","nanti","sekali","terlalu","hanya","menarik"];
		this.getKamusAlay = function(){
			return kamusAlay;
		}
		this.getStopword = function(){
			return stopword;
		}
		this.getKataDasar = function(){
			return kata_dasar;
		}
	}
	tokenizing(dokumen) {
	    var token = [];
	    dokumen.Tweet = dokumen.Tweet.toLowerCase().split(" ");
	    dokumen.Tweet.map(function(term) {
	        if (term.search(/http:/m) == -1 && term.search(/https:/m) == -1) { //replace url
	            if (term.search(/#/m) == -1) { //replce hashtag
	                if (term.search(/@/m) == -1) { //replace username
	                    term = term.replace(/[0-9]/g, ''); //replace digit
	                    term = term.replace(/[^a-z]/g, ' '); //replace non-char
	                    if (term != ' ' || term != '') {
	                        token.push(term);
	                    }
	                }
	            }
	        }
	    });
	    dokumen.Tweet = token.join(" ");
	    return dokumen;
	}
	normalisasi(dokumen) {
		var kamusAlay = this.getKamusAlay();
	    dokumen.Tweet = dokumen.Tweet.split(" ");
	    dokumen.Tweet.map(function(term, index) {
	        for (var i = 0; i < kamusAlay.length; i++) {
	            // console.log(kamusAlay[i].kata);
	            for (var j = 0; j < kamusAlay[i].kata.length; j++) {
	                var find = new RegExp("\\b" + kamusAlay[i].kata[j] + "\\b", 'y');
	                if (term.search(find) != -1) {
	                    dokumen.Tweet[index] = kamusAlay[i].baku;
	                    break;
	                }
	            }
	        }
	    });
	    dokumen.Tweet = dokumen.Tweet.join(" ");
	    return dokumen;
	}


	filtering(dokumen) {
		var stopword = this.getStopword();
	    var temp = [];
	    dokumen.Tweet = dokumen.Tweet.split(" ");
	    dokumen.Tweet.map(function(term) {
	        if (stopword.indexOf(term.trim()) == -1) {
	            // console.log(term);
	            if (term != " " && term != "") {
	            	temp.push(term.trim());
	            }            
	        }
	    });
	    dokumen.Tweet = temp.join(" ");
	    return dokumen;
	}
	stemming(dokumen){
		var kata_dasar = this.getKataDasar();
		dokumen.Tweet = dokumen.Tweet.split(" ");	    
		for (var i = 0;i < dokumen.Tweet.length; i++) {
	        dokumen.Tweet[i] = dokumen.Tweet[i].trim();
	        var prefiks;
	        // console.log("bersih: "+dokumen.Tweet[i]);
	        // console.log("length: "+dokumen.Tweet[i].length);
	        // hapus partikel
	        if (kata_dasar.indexOf(dokumen.Tweet[i]) != -1) {
	            // console.log("hasil : "+dokumen.Tweet[i]);
	            continue;
	        }
	        else{
	            if (dokumen.Tweet[i].length > 3) {
	                if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) == "kah" || dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) == "lah" || dokumen.Tweet[i].substring(dokumen.Tweet.length-3) == "pun") {                    
	                    // console.log("masuk step 1: "+dokumen.Tweet[i]);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(0, dokumen.Tweet[i].length-3);
	                }
	            }
	        }
	        // hapus possesive pronoun
	        if (kata_dasar.indexOf(dokumen.Tweet[i]) != -1) {
	            console.log("hasil: "+dokumen.Tweet[i]);
	            continue;
	        }
	        else{
	            if (dokumen.Tweet[i].length > 4) {
	                // console.log("masuk step 2: "+dokumen.Tweet[i]);
	                if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-2) == "ku" || dokumen.Tweet[i].substring(dokumen.Tweet[i].length-2) == "mu") {
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-2);
	                }else if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) == "nya") {
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-3);
	                }
	            }
	        }

	        //hapus first order prefiks

	        if (kata_dasar.indexOf(dokumen.Tweet[i]) != -1) {
	            // console.log("hapus first oreder: "+dokumen.Tweet[i]);
	            // console.log("hasil : "+dokumen.Tweet[i]);
	            continue;
	        }
	        else{
	            if (dokumen.Tweet[i].length > 3) {
	                // console.log("masuk step 3: "+dokumen.Tweet[i]);
	                if (dokumen.Tweet[i].substring(0,4) == "meng" || dokumen.Tweet[i].substring(0,4) == "peng") {
	                    if (dokumen.Tweet[i].substring(4,5) == "e" || dokumen.Tweet[i].substring(4,5) == "u") {
	                        prefiks = dokumen.Tweet[i].substring(0,4);
	                        dokumen.Tweet[i] = "k"+dokumen.Tweet[i].substring(4);                       
	                    }else{
	                        prefiks = dokumen.Tweet[i].substring(0,4);
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(4);
	                    }
	                }
	                else if (dokumen.Tweet[i].substring(0,4) == "meny") {
	                    prefiks = dokumen.Tweet[i].substring(0,4);
	                    dokumen.Tweet[i] = "s"+dokumen.Tweet[i].substring(4);
	                }
	                else if (dokumen.Tweet[i].substring(0,3) == "men" || dokumen.Tweet[i].substring(0,3) == 'ter') {
	                    prefiks = dokumen.Tweet[i].substring(0,3);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(3);
	                }
	                else if (dokumen.Tweet[i].substring(0,3) == "mem") {
	                    prefiks = dokumen.Tweet[i].substring(0,3);
	                    if (dokumen.Tweet[i].substring(3,4) == "a" || dokumen.Tweet[i].substring(3,4) == "i" || dokumen.Tweet[i].substring(3,4) == "u" ||dokumen.Tweet[i].substring(3,4) == "e" ||dokumen.Tweet[i].substring(3,4) == "o") {
	                        dokumen.Tweet[i] == "p"+dokumen.Tweet[i].substring(3);
	                    }
	                    else{
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(3);
	                    }
	                }
	                else if (dokumen.Tweet[i].substring(0,2) == "di" && (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) != "kan" || dokumen.Tweet[i].substring(dokumen.Tweet[i].length-1) != "i")) {
	                    prefiks = dokumen.Tweet[i].substring(0,2);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(2);
	                }                               
	                else if (dokumen.Tweet[i].substring(0,2) == "me") {
	                    prefiks = dokumen.Tweet[i].substring(0,2);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(2);
	                }
	                else if (dokumen.Tweet[i].substring(0,2) == "ke" && (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) != "kan" && dokumen.Tweet[i].substring(dokumen.Tweet[i].length-1) != "i" )) {
	                    prefiks = dokumen.Tweet[i].substring(0,2);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(2);
	                }
	            }
	        }

	        // hapus secon order prefiks
	        if (kata_dasar.indexOf(dokumen.Tweet[i]) != -1) {
	            // console.log("hapus sec order prefiks : "+dokumen.Tweet[i])
	            // console.log("hasil : "+dokumen.Tweet[i]);
	            continue;
	        }
	        else {
	            if (dokumen.Tweet[i].length > 3) {
	                // console.log("masuk step 4: "+dokumen.Tweet[i]);
	                if (dokumen.Tweet[i].substring(0,3) == "ber") {
	                    prefiks = dokumen.Tweet[i].substring(0,3);
	                    dokumen.Tweet[i] = dokumen.Tweet[i].substring(3);
	                }
	                else if (dokumen.Tweet[i].substring(0,3) == "bel") {
	                    prefiks = dokumen.Tweet[i].substring(0,3);
	                    if (dokumen.Tweet[i].substring(0,5) == "belaj") {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(3);
	                    }
	                    else if (dokumen.Tweet[i].substring(0,5) == "belak") {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0);
	                    }
	                }
	            }
	        }

	        // hapus suffiks
	        if (kata_dasar.indexOf(dokumen.Tweet[i]) != -1) {
	            // console.log("hapus suffikc : " +dokumen.Tweet[i]);
	            // console.log("hasil : "+dokumen.Tweet[i]);
	            continue;
	        }
	        else{
	            if (dokumen.Tweet[i].length > 3) {
	                if (prefiks == undefined) {
	                    // console.log('uddefine');
	                    if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) == "kan") {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-3);
	                    }
	                    else if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-1) == "i") {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-1);
	                    }
	                    else if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-2) == "an") {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-2);
	                    }   
	                }
	                else{                    
	                    // console.log('define : '+prefiks);
	                    if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-3) == "kan" && (prefiks != "ke" && prefiks != "peng")) {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-3);
	                    }
	                    else if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-1) == "i" && (prefiks != "ber" && prefiks != "ke" && prefiks != "peng")) {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-1);
	                    }
	                    else if (dokumen.Tweet[i].substring(dokumen.Tweet[i].length-2) == "an" && (prefiks != "di" && prefiks != "meng" && prefiks != "meng")) {
	                        dokumen.Tweet[i] = dokumen.Tweet[i].substring(0,dokumen.Tweet[i].length-2);
	                    }   
	                }                        
	            }
	        }
	        // console.log("hasil : "+dokumen.Tweet[i]);
	    }
		dokumen.Tweet = dokumen.Tweet.join(" ");
		return dokumen;
	}
}

module.exports = Preprocessing;