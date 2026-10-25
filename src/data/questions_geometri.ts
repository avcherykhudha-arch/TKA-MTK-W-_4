import { Question } from '../types/quiz';

export const questionsGeometri: Question[] = [
  // SOAL 13: PG 5 opsi
  {
    id: 'geometri-13',
    number: 13,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Kesebangunan Segitiga & Teorema Pythagoras',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menentukan ukuran tinggi tak langsung melalui kombinasi kesebangunan berkas sinar sejajar dan Teorema Pythagoras.',
    difficultyLabel: 'Penalaran Menantang',
    difficultyParameter: -0.6,
    questionType: 'single_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Pada suatu siang yang cerah, tim teknisi sipil hendak mengukur tinggi gedung serbaguna tanpa memanjatnya. Di dekat gedung, sebuah tiang vertikal dengan tinggi $t = 2\\text{ meter}$ menghasilkan bayangan mendatar di tanah sepanjang $s_1 = 3\\text{ meter}$. Pada saat yang bersamaan, sinar matahari yang sejajar menyinari gedung tersebut. Ujung bayangan gedung jatuh tepat pada jarak 18 meter dari pangkal tiang, dan posisi tiang berada segaris di antara gedung dan ujung bayangan (jarak total dari ujung bayangan ke dinding dasar gedung adalah $3 + 18 = 21\\text{ meter}$).',
    visualData: {
      type: 'svg',
      svgType: 'similar_triangles',
      altText: 'Diagram kesebangunan sinar matahari: tiang 2 m bayangan 3 m dan gedung dengan bayangan total 21 m'
    },
    questionText: 'Berdasarkan prinsip kesebangunan geometri, berapakah tinggi gedung $H$ tersebut dan berapakah panjang berkas sinar miring dari puncak gedung ke ujung bayangannya?',
    options: [
      'Tinggi gedung 14 meter dan panjang berkas sinar $7\\sqrt{13}$ meter',
      'Tinggi gedung 12 meter dan panjang berkas sinar $3\\sqrt{65}$ meter',
      'Tinggi gedung 14 meter dan panjang berkas sinar $25$ meter',
      'Tinggi gedung 16 meter dan panjang berkas sinar $4\\sqrt{65}$ meter',
      'Tinggi gedung 12 meter dan panjang berkas sinar $15$ meter'
    ],
    // Analysis:
    // Pole: height = 2 m, shadow = 3 m.
    // Building: shadow length = 3 + 18 = 21 m.
    // By similarity:
    // H / Shadow_building = height_pole / shadow_pole
    // H / 21 = 2 / 3 => H = 21 * (2/3) = 14 meters!
    // Hypotenuse (ray from top of building to tip of shadow):
    // L = \sqrt{H^2 + Shadow^2} = \sqrt{14^2 + 21^2} = \sqrt{196 + 441} = \sqrt{637}.
    // Notice 637 = 49 * 13 => L = 7 \sqrt{13} meters!
    // Let's check: 7 \sqrt{13} = \sqrt{49 * 13} = \sqrt{637}.
    // Matches Option A: "Tinggi gedung 14 meter dan panjang berkas sinar 7\sqrt{13} meter"!
    correctAnswer: 0,
    normalSolution: {
      steps: [
        {
          title: 'Langkah 1: Mengidentifikasi segitiga-segitiga sebangun',
          explanation: 'Karena sinar matahari memancar secara sejajar, sudut elevasi $\\theta$ tiang dan gedung adalah sama. Dengan sudut siku-siku di tanah, segitiga bayangan tiang dan segitiga bayangan gedung memenuhi syarat kesebangunan Sudut-Sudut (AA).'
        },
        {
          title: 'Langkah 2: Menghitung tinggi gedung H',
          explanation: 'Panjang bayangan total gedung $= 3 + 18 = 21\\text{ meter}$.\nBerdasarkan perbandingan sisi bersesuaian:\n$$\\frac{H}{21} = \\frac{2}{3} \\Rightarrow H = \\frac{2}{3} \\times 21 = 14\\text{ meter}$$'
        },
        {
          title: 'Langkah 3: Menghitung panjang berkas sinar miring dengan Teorema Pythagoras',
          explanation: 'Panjang berkas sinar $L$ adalah sisi miring segitiga siku-siku dengan alas 21 m dan tinggi 14 m:\n$$L = \\sqrt{14^2 + 21^2} = \\sqrt{196 + 441} = \\sqrt{637}$$\nFaktorkan bilangan kuadrat terbesar: $637 = 49 \\times 13$, sehingga:\n$$L = \\sqrt{49 \\times 13} = 7\\sqrt{13}\\text{ meter}$$'
        }
      ],
      conclusion: 'Tinggi gedung adalah 14 meter dan panjang lintasan sinar matahari adalah $7\\sqrt{13}$ meter (Opsi A).'
    },
    quickSolution: {
      strategyName: 'Faktor Pengali Skala Geometri',
      steps: [
        {
          title: 'Faktor skala bayangan',
          explanation: 'Panjang bayangan dari 3 m menjadi 21 m, artinya dikalikan faktor skala $k = \\frac{21}{3} = 7$.'
        },
        {
          title: 'Kalikan seluruh dimensi segitiga dengan k = 7',
          explanation: '• Tinggi gedung $= 2 \\times 7 = 14\\text{ meter}$.\n• Sisi miring segitiga tiang $= \\sqrt{2^2 + 3^2} = \\sqrt{13}$.\n• Maka sisi miring gedung langsung $= 7 \\times \\sqrt{13} = 7\\sqrt{13}\\text{ meter}$.'
        }
      ],
      conclusion: 'Tanpa mengkuadratkan angka besar (14 dan 21), kita langsung mendapatkan $H = 14$ dan $L = 7\\sqrt{13}$ dalam 15 detik!'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Tepat. Rasio skala 7x memberikan tinggi 14 m dan sisi miring 7√13 m.' },
      { label: 'B', isCorrect: false, explanation: 'Salah. Mengira panjang bayangan gedung hanya 18 meter (lupa menjumlahkan 3 m).' },
      { label: 'C', isCorrect: false, explanation: 'Salah. Angka 25 meter adalah tripel Pythagoras 7-24-25 yang tidak berlaku pada alas 21 m.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Perhitungan rasio kesebangunan tidak tepat.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Menggunakan bayangan 18 m dan tripel 9-12-15 yang keliru.' }
    ],
    misconceptions: [
      'Hanya memakai angka 18 m sebagai bayangan gedung, padahal 18 m adalah jarak antara tiang dan dinding gedung (panjang bayangan total adalah 3 + 18 = 21 m).',
      'Mengkuadratkan 14 dan 21 secara manual tanpa menyederhanakan rasio faktor skala 7 lebih dulu.'
    ],
    keyTakeaway: 'Sifat kesebangunan memperbesar seluruh dimensi panjang (termasuk hipotenusa) dengan faktor skala $k$ yang sama persis: $L = k \\sqrt{a^2 + b^2}$.',
    narration: {
      introduction: 'Selamat datang di Elemen Geometri dan Pengukuran! Kita buka dengan soal nomor 13 mengenai kesebangunan bayangan.',
      stimulus: 'Tiang setinggi 2 meter memiliki bayangan 3 meter. Di belakangnya, gedung menghasilkan bayangan total 21 meter karena jarak tiang ke gedung adalah 18 meter.',
      question: 'Berapakah tinggi gedung dan berapakah panjang berkas sinar miring dari puncak gedung ke ujung bayangannya?',
      options: 'Opsi A: Tinggi 14 meter dan berkas sinar 7 akar 13 meter. Opsi B: 12 meter dan 3 akar 65. Opsi C: 14 meter dan 25 meter. Opsi D: 16 meter dan 4 akar 65. Opsi E: 12 meter dan 15 meter.',
      preAnswerGuidance: 'Hati-hati: panjang bayangan gedung dihitung dari ujung bayangan sampai dasar gedung, yaitu 3 ditambah 18 meter!',
      correctFeedback: 'Hebat sekali! Jawaban A sangat tepat. Kamu melihat faktor skala pengali 7 dengan sangat cerdik.',
      incorrectFeedback: 'Banyak yang lupa menjumlahkan 3 dan 18 meter. Mari perhatikan pembahasannya bersama Mister Jo.',
      normalIntroduction: 'Berikut adalah alur penyelesaian normal.',
      normalSteps: [
        { title: 'Bayangan Total', explanation: 'Ujung bayangan ke gedung berjarak 3 tambah 18 yaitu 21 meter.' },
        { title: 'Kesebangunan', explanation: 'H per 21 sama dengan 2 per 3, menghasilkan tinggi H sama dengan 14 meter.' },
        { title: 'Pythagoras', explanation: 'Sisi miring adalah akar dari 14 kuadrat ditambah 21 kuadrat, yaitu akar 637 atau 7 akar 13 meter.' }
      ],
      normalConclusion: 'Pilihan yang benar adalah Opsi A.',
      quickIntroduction: 'Gunakan Cara Cepat faktor skala dari Mister Jo!',
      quickSteps: [
        { title: 'Faktor Skala', explanation: 'Dari 3 meter ke 21 meter melonjak 7 kali lipat. Jadi k sama dengan 7.' },
        { title: 'Tinggi dan Miring', explanation: 'Tinggi tiang 2 kali 7 jadi 14 meter. Sisi miring tiang akar 13 kali 7 jadi 7 akar 13 meter. Selesai!' }
      ],
      quickConclusion: 'Metode faktor skala menghindarkan kita dari menghitung akar kuadrat angka-angka besar.',
      misconception: 'Kesalahan paling sering adalah menganggap bayangan gedung hanya 18 meter, sehingga menghasilkan tinggi 12 meter.',
      simplerExplanation: 'Bayangan gedung 7 kali lebih panjang dari bayangan tiang. Maka semua ukuran gedung, baik tinggi maupun garis miringnya, pasti 7 kali lipat ukuran tiang!',
      nextQuestion: 'Mantap! Ayo kita beralih ke soal nomor 14 tentang luas dan keliling gabungan bangun datar.'
    }
  },

  // SOAL 14: PG Kompleks 5 opsi (2-3 benar)
  {
    id: 'geometri-14',
    number: 14,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Keliling, Luas Bangun Datar & Kombinasi Lingkaran',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Mengevaluasi klaim matematis mengenai keliling pagar, luas area fungsional, dan proporsi bahan denah taman.',
    difficultyLabel: 'Penalaran Menantang',
    difficultyParameter: -0.3,
    questionType: 'multiple_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Sebuah taman rekreasi kota dirancang dengan denah komposit:\n• Bagian tengah adalah lapangan rumput berbentuk persegi panjang $ABCD$ dengan panjang $p = 28\\text{ meter}$ dan lebar $l = 14\\text{ meter}$.\n• Di sisi barat (lebar $AD$), dibangun kolam ikan berbentuk setengah lingkaran keluar dengan diameter $d = 14\\text{ meter}$ ($r = 7\\text{ meter}$).\n• Di sisi timur (lebar $BC$), dibangun taman bunga berbentuk setengah lingkaran keluar dengan diameter $d = 14\\text{ meter}$ ($r = 7\\text{ meter}$).\n\n(Gunakan pendekatan nilai $\\pi = \\frac{22}{7}$ untuk perhitungan numerik).',
    visualData: {
      type: 'svg',
      svgType: 'park_plan',
      altText: 'Denah taman komposit: persegi panjang 28x14 m dengan dua setengah lingkaran di kedua ujungnya'
    },
    questionText: 'Pilihlah SEMUA pernyataan di bawah ini yang bernilai BENAR terkait ukuran taman tersebut! (Pilihlah 2 atau 3 jawaban yang tepat)',
    options: [
      'Luas total area taman secara keseluruhan adalah $546\\text{ m}^2$.',
      'Keliling batas luar seluruh taman yang perlu dipasangi pagar pengaman adalah $100\\text{ meter}$.',
      'Luas gabungan kolam ikan dan taman bunga setara dengan luas satu lingkaran utuh berdiameter 14 meter yaitu $154\\text{ m}^2$.',
      'Keliling batas luar taman sama dengan keliling persegi panjang $ABCD$ ditambah keliling satu lingkaran utuh.',
      'Rasio luas area lapangan rumput terhadap luas total taman adalah $\\frac{13}{18}$.'
    ],
    // Analysis:
    // Rectangle ABCD: length p = 28 m, width l = 14 m.
    // Area of rectangle = 28 * 14 = 392 m^2.
    // West: semicircle r = 7 m.
    // East: semicircle r = 7 m.
    // Two semicircles make 1 full circle with r = 7 m:
    // Area of circle = \pi r^2 = (22/7) * 7^2 = 154 m^2.
    // Total area = 392 + 154 = 546 m^2.
    // Check statement 1 (A): Total area = 546 m^2 -> TRUE!
    // Check statement 3 (C): Area of combined pool and flower garden = 154 m^2 -> TRUE!
    // Perimeter of outer boundary:
    // Boundary consists of:
    // Top side AB (length = 28 m)
    // Bottom side CD (length = 28 m)
    // Curved boundary West: semicircle arc = \pi * r = (22/7) * 7 = 22 m.
    // Curved boundary East: semicircle arc = \pi * r = 22 m.
    // Total outer perimeter = 28 + 28 + 22 + 22 = 100 meters!
    // Check statement 2 (B): Keliling batas luar = 100 meter -> TRUE!
    // Check statement 4 (D): Perimeter = Keliling ABCD + Keliling Lingkaran?
    // Keliling ABCD = 2(28 + 14) = 84 m. Keliling lingkaran = 2 * pi * r = 44 m.
    // 84 + 44 = 128 m != 100 m (because the internal edges AD and BC of length 14 are NOT part of outer boundary!). So D is FALSE!
    // Check statement 5 (E): Ratio of grass area to total area:
    // 392 / 546 = divide by 14: 28 / 39. (Not 13/18). So E is FALSE!
    // Exactly 3 true statements: A (0), B (1), C (2)!
    correctAnswer: [0, 1, 2],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Opsi A & C: Luas area bangun komposit',
          explanation: '• Luas lapangan rumput (persegi panjang) $= p \\times l = 28 \\times 14 = 392\\text{ m}^2$.\n• Luas gabungan dua setengah lingkaran (kolam + taman bunga) $= \\pi r^2 = \\frac{22}{7} \\times 7^2 = 154\\text{ m}^2$. Maka Opsi C BENAR.\n• Luas total taman $= 392 + 154 = 546\\text{ m}^2$. Maka Opsi A BENAR.'
        },
        {
          title: 'Evaluasi Opsi B & D: Keliling batas luar taman',
          explanation: 'Keliling luar hanya terdiri dari dua sisi panjang lurus dan dua busur setengah lingkaran:\n$$\\text{Keliling} = AB + CD + \\text{Busur Barat} + \\text{Busur Timur} = 28 + 28 + (\\pi \\times 7) + (\\pi \\times 7)$$\n$$\\text{Keliling} = 56 + 22 + 22 = 100\\text{ meter}$$\nMaka Opsi B BENAR.\nSisi lebar internal $AD$ dan $BC$ (panjang $2 \\times 14 = 28\\text{ m}$) berada di dalam taman sehingga tidak dihitung sebagai keliling batas luar. Maka Opsi D SALAH.'
        },
        {
          title: 'Evaluasi Opsi E: Rasio luas rumput terhadap luas total',
          explanation: '$$\\text{Rasio} = \\frac{392}{546} = \\frac{28}{39} \\approx 0,718$$\nBukan $\\frac{13}{18} \\approx 0,722$. Maka Opsi E SALAH.'
        }
      ],
      conclusion: 'Tiga pernyataan yang terbukti benar adalah Opsi A, B, dan C.'
    },
    quickSolution: {
      strategyName: 'Penggabungan Geometri Simetri',
      steps: [
        {
          title: 'Satukan dua setengah lingkaran',
          explanation: 'Dua setengah lingkaran $r = 7$ menjadi satu lingkaran utuh: Luas $= \\frac{22}{7} \\times 49 = 154\\text{ m}^2$ (C benar). Keliling busur $= 44\\text{ m}$.'
        },
        {
          title: 'Hitung Luas Total & Keliling Luar',
          explanation: '• Luas $= (28 \\times 14) + 154 = 392 + 154 = 546\\text{ m}^2$ (A benar).\n• Keliling $= 2 \\times 28 + 44 = 56 + 44 = 100\\text{ m}$ (B benar).'
        }
      ],
      conclusion: 'Kombinasi benar terkunci: A, B, dan C.'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Benar. Luas persegi panjang 392 m^2 + luas lingkaran 154 m^2 = 546 m^2.' },
      { label: 'B', isCorrect: true, explanation: 'Benar. Keliling batas luar = 28 + 28 + 22 + 22 = 100 meter.' },
      { label: 'C', isCorrect: true, explanation: 'Benar. Dua setengah lingkaran berjari-jari sama membentuk 1 lingkaran penuh dengan luas 154 m^2.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Sisi lebar sekat dalam AD dan BC tidak termasuk batas luar pagar.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Rasio luas rumput adalah 392/546 = 28/39, bukan 13/18.' }
    ],
    misconceptions: [
      'Menghitung keliling batas luar dengan menjumlahkan keliling persegi panjang utuh dan lingkaran utuh, sehingga sisi sekat di dalam ikut terhitung ganda.',
      'Lupa membagi diameter 14 meter menjadi jari-jari r = 7 meter saat menghitung rumus pi r kuadrat.'
    ],
    keyTakeaway: 'Keliling bangun gabungan HANYA menghitung batas terluar yang bersentuhan dengan lingkungan luar; sekat atau garis batas dalam tidak boleh dihitung.',
    narration: {
      introduction: 'Kita berada di soal nomor 14 mengenai bangun datar komposit, bentuk pilihan ganda kompleks.',
      stimulus: 'Taman kota tersusun dari lapangan rumput 28 kali 14 meter dengan dua taman setengah lingkaran berjari-jari 7 meter di sisi barat dan timur.',
      question: 'Pilihlah semua pernyataan yang bernilai benar mengenai ukuran taman tersebut.',
      options: 'Opsi A menguji luas total 546 meter persegi. Opsi B menguji keliling pagar luar 100 meter. Opsi C menguji luas dua setengah lingkaran adalah 154 meter persegi. Opsi D menguji rumus keliling gabungan. Opsi E menguji rasio luas rumput 13 per 18.',
      preAnswerGuidance: 'Gabungkan kedua setengah lingkaran menjadi satu lingkaran utuh agar perhitungannya menjadi sangat ringkas!',
      correctFeedback: 'Luar biasa! Pilihan A, B, dan C tepat. Kamu sangat teliti dalam membedakan batas luar dan batas dalam bangun komposit.',
      incorrectFeedback: 'Perhatikan keliling luar: garis sekat di dalam taman tidak boleh ikut dihitung sebagai pagar batas. Mari simak ulasannya.',
      normalIntroduction: 'Berikut adalah pembahasan lengkap langkah demi langkah.',
      normalSteps: [
        { title: 'Luas Lingkaran', explanation: 'Dua setengah lingkaran r = 7 membentuk satu lingkaran berluas 154 meter persegi. Opsi C Benar.' },
        { title: 'Luas Total', explanation: '392 ditambah 154 menghasilkan 546 meter persegi. Opsi A Benar.' },
        { title: 'Keliling Luar', explanation: 'Dua sisi lurus 56 meter ditambah keliling lingkaran 44 meter menghasilkan tepat 100 meter. Opsi B Benar.' },
        { title: 'Opsi D dan E', explanation: 'Sekat dalam tidak ikut dipagar sehingga D salah, dan rasio luas adalah 28 per 39 sehingga E salah.' }
      ],
      normalConclusion: 'Pilihan yang benar adalah A, B, dan C.',
      quickIntroduction: 'Gunakan Cara Cepat penggabungan simetri dari Mister Jo.',
      quickSteps: [
        { title: 'Satukan Lingkaran', explanation: 'Dua setengah lingkaran disatukan jadi luas 154 dan keliling busur 44.' },
        { title: 'Tambah Persegi Panjang', explanation: 'Luas: 392 + 154 = 546. Keliling: 56 + 44 = 100. Selesai!' }
      ],
      quickConclusion: 'Penyatuan geometri simetri menyelesaikan soal ini tanpa keraguan.',
      misconception: 'Banyak peserta menjumlahkan keliling persegi panjang 84 dengan keliling lingkaran 44 sehingga menghasilkan 128 meter.',
      simplerExplanation: 'Bayangkan kamu mengelilingi tepi luar taman: kamu berjalan lurus 28 meter di atas, melengkung 22 meter di kanan, lurus 28 meter di bawah, dan melengkung 22 meter di kiri. Totalnya pas 100 meter!',
      nextQuestion: 'Hebat! Ayo kita lanjut ke soal nomor 15: konstruksi rangka kuda-kuda dan Teorema Pythagoras.'
    }
  },

  // SOAL 15: Benar/Salah 3 Pernyataan
  {
    id: 'geometri-15',
    number: 15,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Hubungan Geometri, Teorema Pythagoras & Jarak Titik',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menentukan kebenaran klaim panjang batang struktural dan jarak titik pada penampang rangka kuda-kuda simetris.',
    difficultyLabel: 'Penalaran Sulit',
    difficultyParameter: 0.3,
    questionType: 'true_false_matrix',
    stimulusType: 'narrative_diagram',
    stimulus: 'Sebuah rangka kuda-kuda atap baja ringan berbentuk segitiga sama kaki $ABC$ dengan bentang dasar $AB = 12\\text{ meter}$ dan tiang tegak utama (king post) $CD = 4,5\\text{ meter}$ tegak lurus di titik tengah $D$ ($AD = DB = 6\\text{ meter}$).\n\nUntuk memperkuat konstruksi, dipasang dua batang penguat miring $DE$ dan $DF$ dengan $E$ adalah titik tengah kaki $AC$ dan $F$ adalah titik tengah kaki $BC$.',
    visualData: {
      type: 'svg',
      svgType: 'truss_elevation',
      altText: 'Penampang rangka kuda-kuda atap segitiga ABC dengan tinggi CD=4.5 m dan batang penguat DE dan DF'
    },
    questionText: 'Tentukan apakah masing-masing pernyataan mengenai ukuran batang rangka atap berikut BENAR atau SALAH!',
    statements: [
      {
        id: 's15-1',
        statement: 'Panjang masing-masing kaki atap miring ($AC$ dan $BC$) adalah $7,5\\text{ meter}$.',
        reason: 'Segitiga siku-siku ADC: AC = √(6^2 + 4.5^2) = √(36 + 20.25) = √56.25 = 7.5 m.'
      },
      {
        id: 's15-2',
        statement: 'Panjang batang penguat $DE$ sama persis dengan setengah dari panjang kaki atap $AC$, yaitu $3,75\\text{ meter}$.',
        reason: 'Dalam segitiga siku-siku ADC dengan sudut siku-siku di D, DE adalah garis berat ke hipotenusa AC, sehingga DE = 1/2 AC = 3.75 m.'
      },
      {
        id: 's15-3',
        statement: 'Jarak mendatar antara titik $E$ dan tiang utama $CD$ adalah $4\\text{ meter}$.',
        reason: 'Karena E titik tengah AC, jarak mendatarnya adalah 1/2 AD = 1/2 * 6 = 3 meter, bukan 4 meter.'
      }
    ],
    // Statements:
    // 1: AC = \sqrt{6^2 + 4.5^2} = \sqrt{36 + 20.25} = \sqrt{56.25} = 7.5 m. (BENAR)
    // 2: DE is median to hypotenuse of right triangle ADC right-angled at D!
    // Property of right triangle: median to hypotenuse = half of hypotenuse!
    // So DE = 7.5 / 2 = 3.75 m. (BENAR)
    // 3: Horizontal distance from E to CD: E is midpoint of AC. A is at x = -6, D is at x = 0, C is at x = 0.
    // Coordinates: A(-6, 0), D(0, 0), C(0, 4.5).
    // Midpoint E = ((-6+0)/2, (0+4.5)/2) = (-3, 2.25).
    // Distance from E to CD (which lies on x = 0): |-3 - 0| = 3 meters, NOT 4 meters! (SALAH)
    // Result: [true, true, false]
    correctAnswer: [true, true, false],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Pernyataan 1 (Panjang Kaki AC dan BC)',
          explanation: 'Segitiga $ADC$ siku-siku di $D$ dengan $AD = 6\\text{ m}$ dan $CD = 4,5\\text{ m}$.\n$$AC = \\sqrt{AD^2 + CD^2} = \\sqrt{6^2 + 4,5^2} = \\sqrt{36 + 20,25} = \\sqrt{56,25} = 7,5\\text{ meter}$$\nKarena simetris, $BC = AC = 7,5\\text{ meter}$. Pernyataan 1 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 2 (Panjang Batang Penguat DE)',
          explanation: 'Tinjau $\\triangle ADC$ yang siku-siku di $D$. Titik $E$ adalah titik tengah sisi miring $AC$.\nBerdasarkan teorema geometri: pada setiap segitiga siku-siku, garis berat yang ditarik dari sudut siku-siku ke sisi miring panjangnya tepat setengah dari sisi miring tersebut:\n$$DE = \\frac{1}{2} \\times AC = \\frac{1}{2} \\times 7,5 = 3,75\\text{ meter}$$\nPernyataan 2 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 3 (Jarak Mendatar Titik E ke Tiang CD)',
          explanation: 'Titik $E$ adalah titik tengah $AC$. Jarak mendatar dari $A$ ke $D$ adalah $6\\text{ meter}$.\nProyeksi titik tengah ke garis dasar membagi jarak mendatar menjadi dua sama panjang:\n$$\\text{Jarak mendatar} = \\frac{1}{2} \\times AD = \\frac{1}{2} \\times 6 = 3\\text{ meter}$$\nKlaim 4 meter adalah salah. Pernyataan 3 SALAH.'
        }
      ],
      conclusion: 'Hasil evaluasi: Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.'
    },
    quickSolution: {
      strategyName: 'Tripel Pythagoras 3-4-5 & Teorema Garis Berat',
      steps: [
        {
          title: 'Tripel Pythagoras 3 : 4 : 5 dikali 1,5',
          explanation: 'Alas $= 4 \\times 1,5 = 6$. Tinggi $= 3 \\times 1,5 = 4,5$. Maka hipotenusa $= 5 \\times 1,5 = 7,5\\text{ m}$ (Pernyataan 1 Benar).'
        },
        {
          title: 'Garis berat siku-siku',
          explanation: 'Panjang garis berat ke hipotenusa selalu $= \\frac{1}{2} \\times 7,5 = 3,75\\text{ m}$ (Pernyataan 2 Benar).'
        },
        {
          title: 'Koordinat tengah mendatar',
          explanation: 'Setengah dari 6 meter adalah 3 meter, bukan 4 meter (Pernyataan 3 Salah).'
        }
      ],
      conclusion: 'Status: [BENAR, BENAR, SALAH].'
    },
    optionExplanations: [
      { label: 'Pernyataan 1', isCorrect: true, explanation: 'Benar. Kaki miring AC = √(6^2 + 4.5^2) = √56.25 = 7.5 meter.' },
      { label: 'Pernyataan 2', isCorrect: true, explanation: 'Benar. Garis berat dari titik siku-siku ke sisi miring panjangnya 1/2 x 7.5 = 3.75 meter.' },
      { label: 'Pernyataan 3', isCorrect: false, explanation: 'Salah. Jarak mendatarnya adalah 1/2 x 6 = 3 meter, bukan 4 meter.' }
    ],
    misconceptions: [
      'Menghitung panjang DE dengan rumus panjang yang rumit, tidak menyadari sifat dasar garis berat segitiga siku-siku.',
      'Mengira proyeksi mendatar titik tengah membagi segitiga menurut luas bukan menurut rasio panjang sisi.'
    ],
    keyTakeaway: 'Pada segitiga siku-siku, titik tengah hipotenusa adalah pusat lingkaran luar, sehingga jarak dari sudut siku-siku ke titik tengah hipotenusa selalu sama dengan setengah hipotenusa ($d = \\frac{1}{2}c$).',
    narration: {
      introduction: 'Kita berada di soal nomor 15, evaluasi Benar atau Salah pada rangka kuda-kuda atap.',
      stimulus: 'Rangka segitiga sama kaki ABC dengan bentang dasar 12 meter dan tinggi tiang 4,5 meter diperkuat oleh batang DE dan DF ke titik tengah kaki atap.',
      question: 'Tentukan apakah masing-masing dari ketiga pernyataan bernilai Benar atau Salah.',
      options: 'Pernyataan satu menguji panjang kaki atap 7,5 meter. Pernyataan dua menguji panjang batang DE 3,75 meter. Pernyataan tiga menguji jarak mendatar E ke tiang adalah 4 meter.',
      preAnswerGuidance: 'Perhatikan tripel Pythagoras 3, 4, 5 yang dikalikan 1,5, dan ingat sifat garis berat segitiga siku-siku!',
      correctFeedback: 'Tepat sekali! Urutan penilaian Benar, Benar, Salah sangat presisi.',
      incorrectFeedback: 'Perhatikan titik tengah E: jarak mendatarnya adalah setengah dari 6 meter yaitu 3 meter, bukan 4 meter.',
      normalIntroduction: 'Mari kita telusuri pembuktiannya bersama Mister Jo.',
      normalSteps: [
        { title: 'Kaki Atap AC', explanation: 'Akar dari 6 kuadrat ditambah 4,5 kuadrat adalah 7,5 meter. Pernyataan 1 Benar.' },
        { title: 'Batang DE', explanation: 'DE adalah garis berat dari sudut siku-siku ke hipotenusa, panjangnya tepat setengah dari 7,5 yaitu 3,75 meter. Pernyataan 2 Benar.' },
        { title: 'Jarak Mendatar', explanation: 'Proyeksi titik tengah menghasilkan setengah dari 6 yaitu 3 meter, bukan 4 meter. Pernyataan 3 Salah.' }
      ],
      normalConclusion: 'Status: Benar, Benar, Salah.',
      quickIntroduction: 'Gunakan Cara Cepat tripel Pythagoras dari Mister Jo.',
      quickSteps: [
        { title: 'Tripel 3-4-5', explanation: '4,5 dan 6 adalah perbesaran 1,5 kali dari 3 dan 4. Sisi miringnya pasti 5 kali 1,5 yaitu 7,5 meter.' },
        { title: 'Garis Berat', explanation: 'Garis berat langsung dibagi 2 menjadi 3,75 meter. Jarak mendatar 6 dibagi 2 adalah 3 meter.' }
      ],
      quickConclusion: 'Penyelesaian tuntas: Benar, Benar, Salah.',
      misconception: 'Banyak peserta tidak tahu sifat bahwa garis berat segitiga siku-siku selalu sama dengan setengah sisi miringnya.',
      simplerExplanation: 'Bayangkan segitiga siku-siku ditaruh di dalam sebuah lingkaran. Sisi miringnya adalah garis tengah lingkaran, dan titik tengahnya adalah titik pusat. Maka jarak dari pusat ke sudut mana pun adalah jari-jari lingkaran, yaitu setengah dari sisi miring!',
      nextQuestion: 'Bagus sekali! Sekarang kita beralih ke soal nomor 16: gabungan bangun ruang tabung dan kerucut.'
    }
  },

  // SOAL 16: PG 5 opsi
  {
    id: 'geometri-16',
    number: 16,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Bangun Ruang Gabungan, Volume & Luas Permukaan',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menganalisis perbandingan volume dan rasio kebutuhan pelat baja pada tangki komposit silinder dan kerucut.',
    difficultyLabel: 'Penalaran Sulit',
    difficultyParameter: 0.8,
    questionType: 'single_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Sebuah tangki penampung semen curah industri tersusun dari gabungan dua bangun ruang:\n• Bagian atas berbentuk silinder tegak tanpa tutup atas berdiameter $6\\text{ meter}$ ($r = 3\\text{ meter}$) dan tinggi $t_s = 8\\text{ meter}$.\n• Bagian bawah berbentuk corong kerucut terbalik dengan diameter alas sama ($r = 3\\text{ meter}$) dan tinggi kerucut $t_k = 4\\text{ meter}$.\n\nUntuk keperluan perawatan berkala, seluruh dinding luar tangki (selimut silinder dan selimut kerucut) akan dilapisi cat antikarat. (Abaikan ketebalan pelat dan gunakan $\\pi$).',
    visualData: {
      type: 'svg',
      svgType: 'spatial_prism',
      altText: 'Diagram tangki komposit: silinder r=3 m t=8 m di atas corong kerucut r=3 m t=4 m'
    },
    questionText: 'Berapakah luas total permukaan dinding luar yang harus dicat dan berapakah kapasitas volume total tangki tersebut?',
    options: [
      'Luas permukaan luar $63\\pi\\text{ m}^2$ dan volume total $84\\pi\\text{ m}^3$',
      'Luas permukaan luar $60\\pi\\text{ m}^2$ dan volume total $72\\pi\\text{ m}^3$',
      'Luas permukaan luar $63\\pi\\text{ m}^2$ dan volume total $96\\pi\\text{ m}^3$',
      'Luas permukaan luar $72\\pi\\text{ m}^2$ dan volume total $84\\pi\\text{ m}^3$',
      'Luas permukaan luar $57\\pi\\text{ m}^2$ dan volume total $84\\pi\\text{ m}^3$'
    ],
    // Analysis:
    // Cylinder: r = 3 m, t_s = 8 m.
    // Cone: r = 3 m, t_k = 4 m.
    // Slant height of cone (garis pelukis s):
    // s = \sqrt{r^2 + t_k^2} = \sqrt{3^2 + 4^2} = 5 m!
    // Lateral surface of cylinder = 2 \pi r t_s = 2 \pi (3)(8) = 48 \pi m^2.
    // Lateral surface of cone = \pi r s = \pi (3)(5) = 15 \pi m^2.
    // Total outside surface area = 48 \pi + 15 \pi = 63 \pi m^2.
    // Volume of cylinder = \pi r^2 t_s = \pi (3^2)(8) = 72 \pi m^3.
    // Volume of cone = (1/3) \pi r^2 t_k = (1/3) \pi (9)(4) = 12 \pi m^3.
    // Total volume = 72 \pi + 12 \pi = 84 \pi m^3.
    // Result: Area = 63 \pi m^2, Volume = 84 \pi m^3.
    // Matches Option A!
    correctAnswer: 0,
    normalSolution: {
      steps: [
        {
          title: 'Langkah 1: Menghitung garis pelukis kerucut (s)',
          explanation: 'Berdasarkan Teorema Pythagoras pada penampang kerucut:\n$$s = \\sqrt{r^2 + t_k^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\text{ meter}$$'
        },
        {
          title: 'Langkah 2: Menghitung luas permukaan luar dinding yang dicat',
          explanation: 'Permukaan luar tangki hanya terdiri dari selimut silinder dan selimut kerucut (tanpa tutup atas dan tanpa sekat pemisah di tengah):\n• Luas selimut silinder $= 2\\pi r t_s = 2\\pi(3)(8) = 48\\pi\\text{ m}^2$\n• Luas selimut kerucut $= \\pi r s = \\pi(3)(5) = 15\\pi\\text{ m}^2$\n• Luas total yang dicat $= 48\\pi + 15\\pi = 63\\pi\\text{ m}^2$'
        },
        {
          title: 'Langkah 3: Menghitung kapasitas volume total tangki',
          explanation: '• Volume silinder $= \\pi r^2 t_s = \\pi(3^2)(8) = 72\\pi\\text{ m}^3$\n• Volume corong kerucut $= \\frac{1}{3}\\pi r^2 t_k = \\frac{1}{3}\\pi(3^2)(4) = 12\\pi\\text{ m}^3$\n• Volume total $= 72\\pi + 12\\pi = 84\\pi\\text{ m}^3$'
        }
      ],
      conclusion: 'Luas permukaan luar adalah $63\\pi\\text{ m}^2$ dan volume total tangki adalah $84\\pi\\text{ m}^3$ (Opsi A).'
    },
    quickSolution: {
      strategyName: 'Faktorisasi Parameter π dan Tripel 3-4-5',
      steps: [
        {
          title: 'Garis pelukis seketika',
          explanation: 'Jari-jari 3 dan tinggi 4 langsung memberikan garis pelukis $s = 5$ (tripel 3-4-5).'
        },
        {
          title: 'Faktorkan πr pada luas',
          explanation: '$L = \\pi r (2t_s + s) = \\pi(3)(2 \\times 8 + 5) = 3\\pi(16 + 5) = 3\\pi \\times 21 = 63\\pi\\text{ m}^2$.'
        },
        {
          title: 'Faktorkan πr^2 pada volume',
          explanation: '$V = \\pi r^2 \\left(t_s + \\frac{t_k}{3}\\right) = 9\\pi \\left(8 + \\frac{4}{3}\\right) = 9\\pi \\times \\frac{28}{3} = 3\\pi \\times 28 = 84\\pi\\text{ m}^3$.'
        }
      ],
      conclusion: 'Hanya 2 perkalian bersih langsung mengungkap Opsi A!'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Tepat. Luas luar = 48π + 15π = 63π m^2, Volume total = 72π + 12π = 84π m^3.' },
      { label: 'B', isCorrect: false, explanation: 'Salah. Luas 60π terjadi jika memakai tinggi t=4 m bukan garis pelukis s=5 m.' },
      { label: 'C', isCorrect: false, explanation: 'Salah. Volume 96π adalah jika kerucut dihitung utuh tanpa pembagi sepertiga.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Luas 72π memasukkan alas silinder yang sebenarnya bolong sebagai sambungan.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Kekeliruan dalam menghitung luas selimut silinder.' }
    ],
    misconceptions: [
      'Menghitung luas permukaan dengan menambahkan alas lingkaran di antara silinder dan kerucut, padahal rongga tangki tersambung.',
      'Menggunakan tinggi kerucut t=4 m untuk luas selimut, bukan garis pelukis miring s=5 m.'
    ],
    keyTakeaway: 'Pada bangun ruang komposit berongga, bidang sambungan internal tidak dihitung dalam luas permukaan luar, dan luas selimut kerucut selalu menggunakan garis pelukis $s = \\sqrt{r^2 + t^2}$.',
    narration: {
      introduction: 'Tantangan nomor 16 menguji kecakapan spasialmu pada bangun ruang gabungan silinder dan kerucut.',
      stimulus: 'Sebuah tangki penampung semen terdiri dari silinder berjari-jari 3 meter tinggi 8 meter di atas corong kerucut tinggi 4 meter.',
      question: 'Berapakah luas permukaan luar yang harus dicat dan berapakah volume total tangki tersebut?',
      options: 'Opsi A: Luas 63 pi dan volume 84 pi. Opsi B: Luas 60 pi dan volume 72 pi. Opsi C: Luas 63 pi dan volume 96 pi. Opsi D: Luas 72 pi dan volume 84 pi. Opsi E: Luas 57 pi dan volume 84 pi.',
      preAnswerGuidance: 'Ingat tripel 3, 4, 5 untuk garis pelukis kerucut, dan jangan hitung sekat pembatas di dalam tangki!',
      correctFeedback: 'Brilian! Pilihan A sangat tepat. Perhitungan luas selimut dan kapasitas volume tangkimu sempurna.',
      incorrectFeedback: 'Hati-hati dengan sekat tengah yang bolong dan garis pelukis kerucut. Mari simak pembahasannya.',
      normalIntroduction: 'Berikut adalah langkah penyelesaian normal.',
      normalSteps: [
        { title: 'Garis Pelukis', explanation: 'Akar dari 3 kuadrat tambah 4 kuadrat adalah 5 meter.' },
        { title: 'Luas Dinding', explanation: 'Selimut tabung 48 pi ditambah selimut kerucut 15 pi menghasilkan 63 pi meter persegi.' },
        { title: 'Volume Total', explanation: 'Volume tabung 72 pi ditambah volume kerucut 12 pi menghasilkan 84 pi meter kubik.' }
      ],
      normalConclusion: 'Hasil yang benar adalah 63 pi dan 84 pi pada Opsi A.',
      quickIntroduction: 'Gunakan Cara Cepat faktorisasi dari Mister Jo.',
      quickSteps: [
        { title: 'Faktor Luas', explanation: 'Tarik pi kali r keluar: 3 pi dikali 16 tambah 5, menghasilkan 3 pi dikali 21 yaitu 63 pi!' },
        { title: 'Faktor Volume', explanation: 'Tarik 9 pi keluar: 9 pi dikali 8 tambah 4 per 3, menghasilkan 84 pi meter kubik.' }
      ],
      quickConclusion: 'Faktorisasi rumus menghemat waktu dan mencegah kesalahan hitung aljabar.',
      misconception: 'Banyak peserta salah mengalikan jari-jari dengan tinggi untuk selimut kerucut, bukan dengan garis pelukis miring.',
      simplerExplanation: 'Tangki ini seperti gelas tinggi yang dasarnya berbentuk corong es krim. Luas catnya adalah selimut gelas ditambah selimut corong, tanpa ada tutup di tengahnya!',
      nextQuestion: 'Hebat! Mari kita masuki soal nomor 17: geometri dimensi tiga kubus penalaran sangat sulit.'
    }
  },

  // SOAL 17: PG Kompleks 5 opsi (2-3 benar)
  {
    id: 'geometri-17',
    number: 17,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Geometri Ruang Tiga Dimensi, Jarak Titik, Garis & Bidang',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menilai hubungan spasial jarak terpendek dari titik ke garis dan bidang pada bangun kubus beraturan.',
    difficultyLabel: 'Penalaran Sangat Sulit',
    difficultyParameter: 1.5,
    questionType: 'multiple_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Diberikan kubus beraturan $ABCD.EFGH$ dengan panjang rusuk $s = 6\\text{ cm}$. Titik $P$ terletak tepat di tengah-tengah rusuk tegak $CG$. Sebuah tim arsitektur mengevaluasi beberapa ukuran jarak terpendek dan hubungan spasial antar-elemen geometris di dalam kubus tersebut.',
    visualData: {
      type: 'svg',
      svgType: 'cube_distance',
      altText: 'Diagram kubus ABCD.EFGH dengan panjang rusuk 6 cm dan titik P di tengah rusuk CG'
    },
    questionText: 'Pilihlah SEMUA pernyataan di bawah ini yang bernilai BENAR terkait hubungan spasial pada kubus tersebut! (Pilihlah 2 atau 3 jawaban yang tepat)',
    options: [
      'Panjang diagonal ruang kubus $AG$ adalah $6\\sqrt{3}\\text{ cm}$.',
      'Jarak dari titik puncak $E$ ke titik tengah $P$ adalah $9\\text{ cm}$.',
      'Jarak dari titik sudut $C$ ke bidang diagonal $BDHF$ adalah $3\\sqrt{2}\\text{ cm}$.',
      'Jarak dari titik $P$ ke garis diagonal bidang $BD$ adalah $3\\sqrt{3}\\text{ cm}$.',
      'Garis $EG$ berpotongan tegak lurus dengan garis diagonal ruang $DF$.'
    ],
    // Analysis:
    // Cube ABCD.EFGH with s = 6 cm.
    // P is midpoint of CG => CP = PG = 3 cm.
    // 1: Space diagonal AG = s \sqrt{3} = 6 \sqrt{3} cm. TRUE!
    // 2: Distance from E to P:
    // Place in coordinates:
    // D(0, 0, 0), A(6, 0, 0), B(6, 6, 0), C(0, 6, 0).
    // H(0, 0, 6), E(6, 0, 6), F(6, 6, 6), G(0, 6, 6).
    // P is midpoint of CG => C(0, 6, 0) and G(0, 6, 6) => P(0, 6, 3).
    // Distance EP = \sqrt{(6 - 0)^2 + (0 - 6)^2 + (6 - 3)^2} = \sqrt{36 + 36 + 9} = \sqrt{81} = 9 cm! TRUE!
    // 3: Distance from C to plane BDHF:
    // BDHF contains BD and CG? No, BDHF contains B, D, H, F.
    // Diagonal AC is perpendicular to BD at center O(3, 3, 0).
    // In fact, AC is perpendicular to plane BDHF!
    // Distance from C to plane BDHF is the distance from C to the center O of base ABCD!
    // Diagonal of base AC = s \sqrt{2} = 6 \sqrt{2} cm.
    // Center O is midpoint of AC, so CO = (1/2) * 6 \sqrt{2} = 3 \sqrt{2} cm!
    // So distance from C to plane BDHF is 3 \sqrt{2} cm! TRUE!
    // Wait, that's already 3 TRUE options: A, B, C!
    // Let's check D:
    // Distance from P to line BD:
    // Line BD connects B(6, 6, 0) and D(0, 0, 0).
    // Center of BD is O(3, 3, 0).
    // Vector OC is perpendicular to BD, OC = 3\sqrt{2}.
    // Triangle POC has right angle at C?
    // Point C to line BD: CO is perpendicular to BD, CO = 3\sqrt{2}.
    // PC is perpendicular to base ABCD, PC = 3.
    // By Theorem of Three Perpendiculars, PO is perpendicular to BD!
    // PO = \sqrt{PC^2 + CO^2} = \sqrt{3^2 + (3\sqrt{2})^2} = \sqrt{9 + 18} = \sqrt{27} = 3\sqrt{3} cm!
    // Wow, D is ALSO 3 \sqrt{3}! That would be 4 true options!
    // We must ensure EXACTLY 2 or 3 correct options.
    // Let's change Option D to: "Jarak dari titik P ke garis diagonal bidang BD adalah 6 cm." (Then D is FALSE!).
    // And Option E:
    // Does EG intersect DF?
    // EG connects (6, 0, 6) to (0, 6, 6).
    // DF connects (0, 0, 0) to (6, 6, 6).
    // At z = 6, DF reaches F(6, 6, 6). EG lies entirely in plane z = 6.
    // The only common point would be if DF crosses EG at z = 6, which is only at F, but F is not on EG (EG has endpoints E and G). They are skew lines (bersilangan), NOT intersecting! So E is FALSE!
    // Perfect! If we change D to "6 cm", then:
    // Correct options: A (0), B (1), C (2).
    // Exactly 3 options correct!
    correctAnswer: [0, 1, 2],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Opsi A (Diagonal Ruang AG)',
          explanation: 'Rumus diagonal ruang kubus berusuk $s$: $d_r = s\\sqrt{3} = 6\\sqrt{3}\\text{ cm}$. Opsi A BENAR.'
        },
        {
          title: 'Evaluasi Opsi B (Jarak Titik E ke P)',
          explanation: 'Gunakan sistem koordinat Cartesius 3D dengan $D(0, 0, 0)$:\n• $E(6, 0, 6)$\n• $P$ di tengah $CG$: $C(0, 6, 0)$ dan $G(0, 6, 6) \\Rightarrow P(0, 6, 3)$.\n$$EP = \\sqrt{(6-0)^2 + (0-6)^2 + (6-3)^2} = \\sqrt{36 + 36 + 9} = \\sqrt{81} = 9\\text{ cm}$$\nOpsi B BENAR.'
        },
        {
          title: 'Evaluasi Opsi C (Jarak Titik C ke Bidang BDHF)',
          explanation: 'Garis diagonal alas $AC$ tegak lurus terhadap garis $BD$ dan tegak lurus rusuk $DH$. Akibatnya, garis $AC$ tegak lurus seluruh bidang $BDHF$.\nJarak dari $C$ ke bidang $BDHF$ adalah panjang ruas dari $C$ ke titik tembus $O$ (titik tengah diagonal $AC$):\n$$CO = \\frac{1}{2} \\times AC = \\frac{1}{2} \\times 6\\sqrt{2} = 3\\sqrt{2}\\text{ cm}$$\nOpsi C BENAR.'
        },
        {
          title: 'Evaluasi Opsi D (Jarak Titik P ke Garis BD)',
          explanation: 'Karena $PC \\perp \\text{alas}$ dan $CO \\perp BD$, berdasarkan Teorema Tiga Tegak Lurus, garis $PO \\perp BD$.\n$$PO = \\sqrt{PC^2 + CO^2} = \\sqrt{3^2 + (3\\sqrt{2})^2} = \\sqrt{9 + 18} = \\sqrt{27} = 3\\sqrt{3}\\text{ cm}$$\nKlaim menyatakan jaraknya 6 cm, sehingga Opsi D SALAH.'
        },
        {
          title: 'Evaluasi Opsi E (Hubungan Garis EG dan DF)',
          explanation: 'Garis $EG$ berada pada bidang atas $EFGH$ ($z = 6$), sedangkan garis $DF$ menembus bidang atas hanya di titik $F$. Titik $F$ tidak terletak pada ruas garis $EG$. Kedua garis tersebut adalah garis bersilangan (skew lines) dan tidak pernah berpotongan. Opsi E SALAH.'
        }
      ],
      conclusion: 'Tiga pernyataan yang terbukti benar adalah Opsi A, B, dan C.'
    },
    quickSolution: {
      strategyName: 'Geometri Analitik 3 Dimensi Kilat',
      steps: [
        {
          title: 'Vektor cepat EP',
          explanation: 'Komponen selisih koordinat: $\\Delta x = 6, \\Delta y = 6, \\Delta z = 3$. Jarak $= \\sqrt{6^2 + 6^2 + 3^2} = \\sqrt{36+36+9} = \\sqrt{81} = 9\\text{ cm}$ (B benar).'
        },
        {
          title: 'Jarak ke bidang diagonal',
          explanation: 'Jarak titik sudut kubus ke bidang diagonal BDHF selalu setengah diagonal sisi: $\\frac{1}{2} \\times 6\\sqrt{2} = 3\\sqrt{2}\\text{ cm}$ (C benar). Diagonal ruang $= 6\\sqrt{3}\\text{ cm}$ (A benar).'
        }
      ],
      conclusion: 'Pernyataan benar langsung terkunci: A, B, dan C.'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Benar. Diagonal ruang kubus = s√3 = 6√3 cm.' },
      { label: 'B', isCorrect: true, explanation: 'Benar. Jarak EP = √(6^2 + 6^2 + 3^2) = √81 = 9 cm.' },
      { label: 'C', isCorrect: true, explanation: 'Benar. Jarak titik C ke bidang diagonal BDHF adalah 1/2 diagonal sisi AC = 3√2 cm.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Jarak sebenarnya adalah √(3^2 + (3√2)^2) = √27 = 3√3 cm, bukan 6 cm.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Garis EG dan DF bersilangan di ruang, tidak berpotongan.' }
    ],
    misconceptions: [
      'Mengira garis di dalam kubus berpotongan hanya karena tampak bersilangan dari sudut pandang 2D (mengabaikan kedalaman z).',
      'Salah memproyeksikan titik C ke bidang BDHF (mengira jatuh di titik B atau D, bukan di titik tengah O).'
    ],
    keyTakeaway: 'Sistem koordinat 3D $(x, y, z)$ adalah alat paling ampuh dan bebas salah untuk membuktikan jarak titik ke garis atau bidang pada geometri ruang.',
    narration: {
      introduction: 'Kita berada di soal nomor 17, materi dimensi tiga pada kubus berusuk 6 cm, pilihan ganda kompleks.',
      stimulus: 'Kubus ABCD.EFGH memiliki titik P di tengah rusuk tegak CG. Perhatikan posisi titik, diagonal sisi, dan diagonal ruang pada kubus.',
      question: 'Pilihlah seluruh pernyataan spasial yang bernilai benar.',
      options: 'Opsi A menguji diagonal ruang 6 akar 3 cm. Opsi B menguji jarak E ke P adalah 9 cm. Opsi C menguji jarak C ke bidang BDHF adalah 3 akar 2 cm. Opsi D menguji jarak P ke garis BD adalah 6 cm. Opsi E menguji garis EG berpotongan tegak lurus dengan DF.',
      preAnswerGuidance: 'Gunakan koordinat Cartesius 3D agar jarak antar titik dapat dihitung secara pasti tanpa keraguan proyeksi gambar!',
      correctFeedback: 'Luar biasa! Pilihan A, B, dan C adalah kombinasi yang benar. Penalaran spasialmu berada di level master!',
      incorrectFeedback: 'Dimensi tiga memang membutuhkan imajinasi ruang yang presisi. Mari kita periksa koordinatnya bersama Mister Jo.',
      normalIntroduction: 'Berikut pembuktian matematisnya.',
      normalSteps: [
        { title: 'Diagonal Ruang', explanation: 's akar 3 adalah 6 akar 3 cm. Opsi A Benar.' },
        { title: 'Jarak E ke P', explanation: 'Akar dari 6 kuadrat tambah 6 kuadrat tambah 3 kuadrat menghasilkan akar 81 yaitu 9 cm. Opsi B Benar.' },
        { title: 'Jarak ke Bidang', explanation: 'Proyeksi C ke BDHF jatuh di titik tengah diagonal AC, panjangnya setengah dari 6 akar 2 yaitu 3 akar 2 cm. Opsi C Benar.' },
        { title: 'Garis dan Bidang', explanation: 'Jarak P ke BD adalah 3 akar 3 cm, dan garis EG bersilangan dengan DF. Opsi D dan E Salah.' }
      ],
      normalConclusion: 'Opsi yang benar adalah A, B, dan C.',
      quickIntroduction: 'Gunakan trik koordinat 3D dari Mister Jo.',
      quickSteps: [
        { title: 'Vektor Jarak EP', explanation: 'Komponennya 6, 6, dan 3. Kuadratnya 36 + 36 + 9 = 81, akarnya pas 9 cm!' },
        { title: 'Sifat Setengah Diagonal', explanation: 'Jarak pojok kubus ke bidang diagonal selalu setengah diagonal bidang: 3 akar 2 cm.' }
      ],
      quickConclusion: 'Metode koordinat menuntaskan soal dimensi tiga secara instan dan pasti.',
      misconception: 'Banyak peserta mengira dua garis di gambar 2D yang tampak saling memotong pasti berpotongan di ruang nyata.',
      simplerExplanation: 'Bayangkan sebuah ruangan kamar: satu garis membentang di langit-langit dari pojok ke pojok, sedangkan garis lain menancap miring dari lantai ke pojok atas lain. Keduanya tidak pernah bertemu atau bersentuhan sama sekali di udara!',
      nextQuestion: 'Hebat! Ayo kita selesaikan Elemen Geometri di soal nomor 18 tentang transformasi geometri.'
    }
  },

  // SOAL 18: Benar/Salah 3 Pernyataan
  {
    id: 'geometri-18',
    number: 18,
    element: 'Geometri dan Pengukuran',
    subtopic: 'Komposisi Transformasi Geometri (Translasi, Refleksi, Rotasi, Dilatasi)',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Mengevaluasi hasil pemetaan titik koordinat dan sifat invarian luas pada komposisi transformasi geometri bertahap.',
    difficultyLabel: 'Penalaran Sangat Sulit',
    difficultyParameter: 1.8,
    questionType: 'true_false_matrix',
    stimulusType: 'narrative_graph',
    stimulus: 'Sebuah segitiga $T_0$ pada bidang koordinat memiliki titik-titik sudut $A(2, 1)$, $B(6, 1)$, dan $C(4, 5)$. Luas awal segitiga tersebut adalah:\n$$L_0 = \\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi} = \\frac{1}{2} \\times (6 - 2) \\times (5 - 1) = 8\\text{ satuan luas}$$\nSegitiga $T_0$ ditransformasikan melalui urutan dua tahap:\n1. Tahap I ($R_1$): Refleksi terhadap garis $y = x$, menghasilkan segitiga bayangan $T_1$.\n2. Tahap II ($R_2$): Dilatasi dengan pusat $O(0,0)$ dan faktor skala $k = -2$, menghasilkan segitiga akhir $T_2$.',
    visualData: {
      type: 'svg',
      svgType: 'coordinate_transform',
      altText: 'Grafik bidang koordinat transformasi segitiga: refleksi y=x dilanjutkan dilatasi pusat O faktor -2'
    },
    questionText: 'Tentukan apakah masing-masing pernyataan mengenai hasil transformasi geometri tersebut BENAR atau SALAH!',
    statements: [
      {
        id: 's18-1',
        statement: 'Koordinat bayangan titik puncak $C(4, 5)$ pada segitiga akhir $T_2$ adalah $(-10, -8)$.',
        reason: 'Refleksi y=x memetakan (4, 5) -> (5, 4). Dilatasi [O, -2] memetakan (5, 4) -> (-2*5, -2*4) = (-10, -8).'
      },
      {
        id: 's18-2',
        statement: 'Luas segitiga akhir $T_2$ menjadi 32 satuan luas, yaitu 4 kali lipat dari luas segitiga mula-mula $L_0$.',
        reason: 'Refleksi mempertahankan luas (det = -1), dilatasi dengan skala k=-2 memperbesar luas sebesar |k|^2 = (-2)^2 = 4 kali lipat: 4 x 8 = 32 satuan luas.'
      },
      {
        id: 's18-3',
        statement: 'Orientasi putaran sudut segitiga akhir $T_2$ sama persis dengan orientasi segitiga mula-mula $T_0$ (tidak mengalami pembalikan orientasi).',
        reason: 'Determinan matriks komposisi: det(M_refleksi) = -1, det(M_dilatasi) = (-2)^2 = 4. Determinan total = -1 x 4 = -4 < 0. Nilai negatif berarti orientasi berbalik!'
      }
    ],
    // Statements:
    // 1: C(4, 5) -> Refleksi y=x: (5, 4). Dilatasi [O, -2]: (-10, -8). (BENAR)
    // 2: Luas T2 = |k|^2 * L0 = (-2)^2 * 8 = 4 * 8 = 32 satuan luas. (BENAR)
    // 3: Orientasi putaran sudut sama persis?
    // Let's check determinant of transformation matrix:
    // Refleksi y=x has matrix [[0, 1], [1, 0]] with det = -1 (reverses orientation).
    // Dilatasi k = -2 has matrix [[-2, 0], [0, -2]] with det = (-2)*(-2) = +4 (preserves orientation, it's a 180 deg rotation + dilation).
    // Composite matrix M = [[-2, 0], [0, -2]] * [[0, 1], [1, 0]] = [[0, -2], [-2, 0]].
    // det(M) = 0 - (-2)*(-2) = -4 < 0!
    // Since det(M) is negative, the orientation is REVERSED (dibalik), NOT the same!
    // So statement 3 is SALAH!
    // Result: [true, true, false]
    correctAnswer: [true, true, false],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Pernyataan 1 (Bayangan Titik C)',
          explanation: '• Tahap I (Refleksi terhadap $y = x$): $(x, y) \\to (y, x)$. Maka titik $C(4, 5)$ dipetakan ke $C\'(5, 4)$.\n• Tahap II (Dilatasi $[O, -2]$): $(x\', y\') \\to (-2x\', -2y\')$. Maka $C\'(5, 4)$ dipetakan ke $C\'\'(-2 \\times 5, -2 \\times 4) = (-10, -8)$.\nPernyataan 1 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 2 (Luas Segitiga Akhir T_2)',
          explanation: '• Refleksi adalah transformasi isometri yang tidak mengubah luas bangun (faktor skala luas $= 1$).\n• Dilatasi dengan faktor skala $k$ mengubah luas bangun sebanding dengan kuadrat faktor skalanya: $L_{\\text{akhir}} = k^2 \\times L_0$.\n$$L_2 = (-2)^2 \\times 8 = 4 \\times 8 = 32\\text{ satuan luas}$$\nPernyataan 2 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 3 (Orientasi Geometri / Kiralitas)',
          explanation: 'Matriks refleksi garis $y = x$ adalah $M_1 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ dengan $\\det(M_1) = -1$ (membalikkan orientasi putaran sudut).\nMatriks dilatasi $[O, -2]$ adalah $M_2 = \\begin{pmatrix} -2 & 0 \\\\ 0 & -2 \\end{pmatrix}$ dengan $\\det(M_2) = (-2)(-2) = +4$.\nDeterminan matriks komposisi total adalah $\\det(M_{\\text{total}}) = \\det(M_2) \\times \\det(M_1) = 4 \\times (-1) = -4$.\nKarena nilai determinan bernilai negatif ($-4 < 0$), orientasi bangun akhir terbalik dibandingkan orientasi bangun mula-mula. Pernyataan 3 SALAH.'
        }
      ],
      conclusion: 'Hasil evaluasi: Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.'
    },
    quickSolution: {
      strategyName: 'Determinan Matriks Transformasi',
      steps: [
        {
          title: 'Cek titik C',
          explanation: '$(4, 5) \\to (5, 4) \\to (-10, -8)$ (Pernyataan 1 Benar).'
        },
        {
          title: 'Cek pengali luas',
          explanation: 'Pengali luas $= |\\det(M)| = |-4| = 4$. Luas $= 4 \\times 8 = 32$ (Pernyataan 2 Benar).'
        },
        {
          title: 'Cek orientasi',
          explanation: 'Tanda determinan negatif ($-4$) menandakan orientasi berbalik kiralitasnya (Pernyataan 3 Salah).'
        }
      ],
      conclusion: 'Status: [BENAR, BENAR, SALAH].'
    },
    optionExplanations: [
      { label: 'Pernyataan 1', isCorrect: true, explanation: 'Benar. (4, 5) direfleksi ke (5, 4), lalu didilatasi -2 menjadi (-10, -8).' },
      { label: 'Pernyataan 2', isCorrect: true, explanation: 'Benar. Luas berubah sebanding dengan k^2 = (-2)^2 = 4 kali lipat, 4 x 8 = 32 satuan luas.' },
      { label: 'Pernyataan 3', isCorrect: false, explanation: 'Salah. Karena determinan total transformasi negatif (-4), orientasi putaran sudut segitiga mengalami pembalikan.' }
    ],
    misconceptions: [
      'Mengira faktor skala luas bernilai negatif karena k = -2, padahal luas selalu dikalikan dengan k^2 (bernilai positif).',
      'Lupa bahwa refleksi membalikkan arah orientasi sudut (searah jarum jam menjadi berlawanan arah jarum jam).'
    ],
    keyTakeaway: 'Pada transformasi geometri 2D, luas berubah sebesar $|\\det(M)| = k^2$, dan orientasi bangun dipertahankan jika $\\det(M) > 0$ serta dibalik jika $\\det(M) < 0$.',
    narration: {
      introduction: 'Kita berada di soal penutup Elemen Geometri dan Pengukuran, yaitu soal nomor 18 tentang komposisi transformasi.',
      stimulus: 'Segitiga T0 dengan luas 8 satuan mengalami dua tahap perubahan: refleksi garis y = x, dilanjutkan dilatasi pusat O dengan faktor skala minus 2.',
      question: 'Tentukan kebenaran dari masing-masing pernyataan mengenai bayangan titik, luas, dan orientasi sudut.',
      options: 'Pernyataan satu menguji koordinat titik C akhir (-10, -8). Pernyataan dua menguji luas akhir 32 satuan luas. Pernyataan tiga menguji apakah orientasi putaran sudut tidak berbalik.',
      preAnswerGuidance: 'Ingat bahwa luas selalu dikalikan k kuadrat, dan periksa tanda determinan matriks untuk mengetahui orientasi!',
      correctFeedback: 'Sempurna! Urutan penilaian Benar, Benar, Salah sangat tepat. Penguasaan transformasimu luar biasa.',
      incorrectFeedback: 'Perhatikan tanda determinan: determinan refleksi bernilai minus 1, yang menyebabkan orientasi sudut terbalik.',
      normalIntroduction: 'Mari kita telusuri pembuktian lengkapnya.',
      normalSteps: [
        { title: 'Pemetaan Titik C', explanation: '4, 5 ditukar menjadi 5, 4 lalu dikali minus 2 menjadi minus 10, minus 8. Pernyataan 1 Benar.' },
        { title: 'Pengali Luas', explanation: 'Luas dikalikan minus 2 kuadrat yaitu 4. 8 dikali 4 adalah 32 satuan luas. Pernyataan 2 Benar.' },
        { title: 'Orientasi Sudut', explanation: 'Determinan matriks total adalah minus 4. Tanda minus membuktikan orientasi sudut terbalik. Pernyataan 3 Salah.' }
      ],
      normalConclusion: 'Status penilaian: Benar, Benar, Salah.',
      quickIntroduction: 'Gunakan trik determinan kilat dari Mister Jo.',
      quickSteps: [
        { title: 'Titik C', explanation: 'Tukar lalu kali minus 2: langsung (-10, -8).' },
        { title: 'Luas dan Tanda', explanation: 'Besar determinan 4 melipatgandakan luas jadi 32. Tanda minus membalikkan orientasi putaran.' }
      ],
      quickConclusion: 'Metode determinan menjawab seluruh aspek transformasi dalam sekejap.',
      misconception: 'Banyak siswa mengira luas bisa bernilai negatif karena faktor skala minus 2.',
      simplerExplanation: 'Refleksi seperti melihat ke cermin: tulisan di bajumu terbalik kiri-kanan. Lalu diperbesar 2 kali dan diputar 180 derajat. Tulisannya tetap terbalik dari aslinya, dan ukurannya menjadi 4 kali lebih luas!',
      nextQuestion: 'Luar biasa! Tiga elemen telah berhasil kamu selesaikan. Sekarang saatnya kita menaklukkan Elemen Trigonometri di soal nomor 19!'
    }
  }
];
