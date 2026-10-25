import { Question } from '../types/quiz';

export const questionsTrigonometri: Question[] = [
  // SOAL 19: PG 5 opsi
  {
    id: 'trigonometri-19',
    number: 19,
    element: 'Trigonometri',
    subtopic: 'Perbandingan Trigonometri & Pengukuran Ketinggian Bertahap',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menyusun model trigonometri tak langsung untuk menentukan tinggi gedung dari dua sudut elevasi observasi bertahap.',
    difficultyLabel: 'Penalaran Menantang',
    difficultyParameter: -0.5,
    questionType: 'single_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Seorang surveyor geospasial mengukur tinggi menara telekomunikasi vertikal dari dua titik pengamatan di tanah datar yang berada segaris dengan kaki menara:\n• Dari titik $A$, sudut elevasi ke puncak menara terukur $\\alpha = 30^\\circ$.\n• Surveyor kemudian bergerak maju mendekati kaki menara sejauh $d = 50\\text{ meter}$ menuju titik $B$. Dari titik $B$, sudut elevasi ke puncak menara terukur $\\beta = 60^\\circ$.\n\n(Tinggi alat ukur theodolite diabaikan dan kaki menara berada pada bidang horizontal yang sama).',
    visualData: {
      type: 'svg',
      svgType: 'elevation_angle',
      altText: 'Diagram dua sudut elevasi: Titik A 30 derajat, maju 50 m ke titik B 60 derajat mengamati puncak menara'
    },
    questionText: 'Berdasarkan model perbandingan tangen sudut elevasi tersebut, berapakah tinggi menara $t$ dan berapakah jarak dari titik $B$ ke dasar menara?',
    options: [
      'Tinggi menara $25\\sqrt{3}\\text{ meter}$ dan jarak titik B ke dasar menara $25\\text{ meter}$',
      'Tinggi menara $50\\sqrt{3}\\text{ meter}$ dan jarak titik B ke dasar menara $50\\text{ meter}$',
      'Tinggi menara $25\\sqrt{3}\\text{ meter}$ dan jarak titik B ke dasar menara $50\\text{ meter}$',
      'Tinggi menara $75\\text{ meter}$ dan jarak titik B ke dasar menara $25\\sqrt{3}\\text{ meter}$',
      'Tinggi menara $30\\sqrt{3}\\text{ meter}$ dan jarak titik B ke dasar menara $30\\text{ meter}$'
    ],
    // Analysis:
    // Let x = distance from B to base of tower.
    // Distance from A to base = x + 50.
    // Height = t.
    // In triangle at B: tan(60) = t / x => t = x \sqrt{3}.
    // In triangle at A: tan(30) = t / (x + 50) => 1/\sqrt{3} = t / (x + 50) => t \sqrt{3} = x + 50.
    // Substitute t = x \sqrt{3}: (x \sqrt{3}) \sqrt{3} = x + 50 => 3x = x + 50 => 2x = 50 => x = 25 meters!
    // Then t = 25 \sqrt{3} meters!
    // Result: t = 25 \sqrt{3} m, distance from B to base x = 25 m.
    // Option A is correct!
    correctAnswer: 0,
    normalSolution: {
      steps: [
        {
          title: 'Langkah 1: Menyusun persamaan trigonometri pada titik B',
          explanation: 'Misalkan jarak dari titik $B$ ke kaki menara adalah $x$ meter dan tinggi menara adalah $t$ meter.\nPada $\\triangle$ siku-siku dengan sudut $60^\\circ$:\n$$\\tan(60^\\circ) = \\frac{t}{x} \\Rightarrow \\sqrt{3} = \\frac{t}{x} \\Rightarrow t = x\\sqrt{3} \\quad \\text{--- Persamaan (1)}$$'
        },
        {
          title: 'Langkah 2: Menyusun persamaan trigonometri pada titik A',
          explanation: 'Jarak total dari titik $A$ ke kaki menara adalah $x + 50$ meter.\nPada $\\triangle$ siku-siku dengan sudut $30^\\circ$:\n$$\\tan(30^\\circ) = \\frac{t}{x + 50} \\Rightarrow \\frac{1}{\\sqrt{3}} = \\frac{t}{x + 50} \\Rightarrow t\\sqrt{3} = x + 50 \\quad \\text{--- Persamaan (2)}$$'
        },
        {
          title: 'Langkah 3: Substitusi dan eliminasi variabel x',
          explanation: 'Substitusikan Persamaan (1) ke Persamaan (2):\n$$(x\\sqrt{3})\\sqrt{3} = x + 50$$\n$$3x = x + 50 \\Rightarrow 2x = 50 \\Rightarrow x = 25\\text{ meter}$$\nJarak dari titik $B$ ke dasar menara adalah 25 meter.'
        },
        {
          title: 'Langkah 4: Menghitung tinggi menara t',
          explanation: '$$t = x\\sqrt{3} = 25\\sqrt{3}\\text{ meter}$$'
        }
      ],
      conclusion: 'Tinggi menara adalah $25\\sqrt{3}\\text{ meter}$ dan jarak titik $B$ ke dasar menara adalah $25\\text{ meter}$ (Opsi A).'
    },
    quickSolution: {
      strategyName: 'Geometri Segitiga Sama Kaki Luar (Exterior Angle)',
      steps: [
        {
          title: 'Perhatikan segitiga luar TAB',
          explanation: 'Sudut luar di $B$ adalah $60^\\circ$, sudut di $A$ adalah $30^\\circ$. Maka sudut di puncak $\\angle ATB = 60^\\circ - 30^\\circ = 30^\\circ$.'
        },
        {
          title: 'Sifat segitiga sama kaki',
          explanation: 'Karena $\\angle TAB = \\angle ATB = 30^\\circ$, maka $\\triangle TAB$ adalah sama kaki! Panjang sisi miring $TB = AB = 50\\text{ meter}$.'
        },
        {
          title: 'Segitiga siku-siku 30-60-90 pada T-B-Dasar',
          explanation: 'Dengan hipotenusa $TB = 50\\text{ m}$:\n• Sisi depan sudut $30^\\circ$ (jarak mendatar $x$) $= \\frac{1}{2} \\times 50 = 25\\text{ meter}$.\n• Sisi depan sudut $60^\\circ$ (tinggi $t$) $= 25\\sqrt{3}\\text{ meter}$.'
        }
      ],
      conclusion: 'Tanpa membuat sistem persamaan aljabar apa pun, jawaban diperoleh seketika dalam 15 detik!'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Tepat. t = 25√3 meter dan x = 25 meter.' },
      { label: 'B', isCorrect: false, explanation: 'Salah. Angka 50√3 didapat jika salah menganggap jarak B ke menara adalah 50 meter.' },
      { label: 'C', isCorrect: false, explanation: 'Salah. Jarak 50 meter adalah jarak dari A ke B, bukan dari B ke dasar menara.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Nilai tangen tertukar antara pembilang dan penyebut.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Angka 30 bukan kelipatan yang tepat dari pembagian 50 dengan 2.' }
    ],
    misconceptions: [
      'Menyamakan jarak dari B ke menara dengan jarak A ke B (keduanya dianggap 50 m).',
      'Menggunakan rumus tangen 30 derajat = 1 / akar 3 secara keliru pada pecahan bertingkat.'
    ],
    keyTakeaway: 'Kombinasi sudut elevasi $30^\\circ$ dan $60^\\circ$ selalu menghasilkan segitiga tumpul sama kaki di luar, sehingga sisi miring $TB$ sama panjang dengan jarak pergeseran $AB$.',
    narration: {
      introduction: 'Selamat datang di Elemen Trigonometri! Kita awali dengan soal nomor 19 mengenai sudut elevasi bertahap.',
      stimulus: 'Seorang surveyor mengukur tinggi menara dari titik A dengan sudut elevasi 30 derajat, lalu maju 50 meter ke titik B dengan sudut 60 derajat.',
      question: 'Berapakah tinggi menara dan berapakah jarak dari titik B ke dasar menara?',
      options: 'Opsi A: Tinggi 25 akar 3 meter dan jarak B ke dasar 25 meter. Opsi B: 50 akar 3 dan 50 meter. Opsi C: 25 akar 3 dan 50 meter. Opsi D: 75 meter dan 25 akar 3. Opsi E: 30 akar 3 dan 30 meter.',
      preAnswerGuidance: 'Perhatikan sudut luar 60 derajat dikurangi sudut dalam 30 derajat menghasilkan sudut 30 derajat. Itu segitiga sama kaki!',
      correctFeedback: 'Brilian! Pilihan A sangat tepat. Kamu memanfaatkan hubungan tangen dan sudut luar segitiga dengan sempurna.',
      incorrectFeedback: 'Hati-hati dengan jarak mendatar dari B ke menara. Mari kita bedah trik segitiga sama kaki bersama Mister Jo.',
      normalIntroduction: 'Berikut adalah alur penyelesaian normal.',
      normalSteps: [
        { title: 'Persamaan di Titik B', explanation: 'Tinggi t sama dengan x dikali tangen 60 derajat yaitu x akar 3.' },
        { title: 'Persamaan di Titik A', explanation: 't dibagi x tambah 50 sama dengan tangen 30 derajat yaitu 1 per akar 3.' },
        { title: 'Eliminasi x', explanation: '3x sama dengan x tambah 50, menghasilkan 2x sama dengan 50, jadi x sama dengan 25 meter.' },
        { title: 'Hitung Tinggi', explanation: 't sama dengan 25 akar 3 meter.' }
      ],
      normalConclusion: 'Hasil akhir adalah opsi A.',
      quickIntroduction: 'Simak Cara Cepat segitiga sama kaki dari Mister Jo!',
      quickSteps: [
        { title: 'Segitiga Sama Kaki', explanation: 'Sudut puncak adalah 60 dikurangi 30 yaitu 30 derajat. Karena sudut alas sama-sama 30 derajat, sisi miring TB sama persis dengan jarak maju yaitu 50 meter!' },
        { title: 'Rasio Siku-siku', explanation: 'Alas di depan 30 derajat adalah setengah dari 50 yaitu 25 meter. Tingginya 25 akar 3 meter. Selesai!' }
      ],
      quickConclusion: 'Metode sudut luar menyelesaikan soal elevasi 30-60 dalam hitungan detik tanpa sistem persamaan.',
      misconception: 'Banyak peserta mengira jarak titik B ke menara juga 50 meter karena terjebak angka di stimulus.',
      simplerExplanation: 'Kombinasi sudut 30 dan 60 derajat memiliki keajaiban: jarak miring dari pengamat kedua ke puncak menara sama persis dengan jarak jalan kaki 50 meter yang baru saja ditempuh!',
      nextQuestion: 'Hebat! Ayo kita lanjutkan ke soal nomor 20 mengenai kuadran dan perbandingan trigonometri.'
    }
  },

  // SOAL 20: PG Kompleks 5 opsi (2-3 benar)
  {
    id: 'trigonometri-20',
    number: 20,
    element: 'Trigonometri',
    subtopic: 'Perbandingan Trigonometri di Berbagai Kuadran',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Mengevaluasi kebenaran nilai dan tanda perbandingan trigonometri dasar pada sudut tumpul Kuadran II.',
    difficultyLabel: 'Penalaran Menantang',
    difficultyParameter: -0.2,
    questionType: 'multiple_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Sebuah radar maritim mendeteksi koordinat kapal nelayan pada bidang Cartesius. Garis hubung dari pusat radar $O(0,0)$ ke posisi kapal membentuk sudut $\\theta$ terhadap sumbu-$X$ positif dengan rentang $90^\\circ < \\theta < 180^\\circ$ (Kuadran II). Diketahui salah satu nilai perbandingannya adalah:\n$$\\cos(\\theta) = -\\frac{3}{5}$$\nTim navigasi menguji lima proposisi mengenai nilai perbandingan trigonometri lainnya untuk sudut $\\theta$ tersebut.',
    visualData: {
      type: 'svg',
      svgType: 'trig_unit_circle',
      altText: 'Diagram lingkaran trigonometri kuadran II dengan cos theta = -3/5'
    },
    questionText: 'Pilihlah SEMUA proposisi di bawah ini yang bernilai BENAR untuk sudut $\\theta$ di Kuadran II! (Pilihlah 2 atau 3 jawaban yang tepat)',
    options: [
      'Nilai $\\sin(\\theta) = \\frac{4}{5}$.',
      'Nilai $\\tan(\\theta) = -\\frac{4}{3}$.',
      'Nilai $\\csc(\\theta) = -\\frac{5}{4}$.',
      'Nilai $\\sec(\\theta) = -\\frac{5}{3}$.',
      'Nilai dari ekspresi $\\sin^2(\\theta) - \\cos^2(\\theta) = \\frac{7}{25}$.'
    ],
    // Analysis:
    // \theta in Quadrant II: 90° < \theta < 180°.
    // In Quadrant II:
    // x < 0, y > 0, r > 0.
    // Given cos(\theta) = -3/5 => x = -3, r = 5.
    // y = \sqrt{r^2 - x^2} = \sqrt{25 - 9} = \sqrt{16} = 4 (positive because Quad II).
    // Let's verify all 5 options:
    // A: \sin(\theta) = y / r = 4/5. TRUE!
    // B: \tan(\theta) = y / x = 4 / (-3) = -4/3. TRUE!
    // C: \csc(\theta) = 1 / \sin(\theta) = 5/4 (positive!). The option says -5/4. So C is FALSE!
    // D: \sec(\theta) = 1 / \cos(\theta) = -5/3. TRUE!
    // E: \sin^2(\theta) - \cos^2(\theta) = (4/5)^2 - (-3/5)^2 = 16/25 - 9/25 = 7/25. TRUE!
    // Wait, that would mean A, B, D, E are all TRUE (4 options!).
    // We must ensure EXACTLY 2 or 3 correct options!
    // Let's modify Option B or D or E:
    // If we change Option D to: "Nilai \sec(\theta) = \frac{5}{3}" (omitting negative sign, making it FALSE!).
    // Then correct options are A (0), B (1), E (4)! (Exactly 3 correct options!)
    // Let's verify:
    // A: \sin(\theta) = 4/5 -> TRUE.
    // B: \tan(\theta) = -4/3 -> TRUE.
    // C: \csc(\theta) = -5/4 -> FALSE (csc is positive in Quad II).
    // D: \sec(\theta) = 5/3 -> FALSE (sec is negative in Quad II).
    // E: \sin^2(\theta) - \cos^2(\theta) = 7/25 -> TRUE (16/25 - 9/25 = 7/25).
    // Perfectly 3 correct options: A, B, E!
    correctAnswer: [0, 1, 4],
    normalSolution: {
      steps: [
        {
          title: 'Langkah 1: Menentukan komponen koordinat x, y, r',
          explanation: 'Karena $\\cos(\\theta) = -\\frac{3}{5}$ dan $\\theta$ berada di Kuadran II ($90^\\circ < \\theta < 180^\\circ$):\n• $x = -3$\n• $r = 5$\n• $y = \\sqrt{r^2 - x^2} = \\sqrt{5^2 - (-3)^2} = \\sqrt{25 - 9} = \\sqrt{16} = +4$ (karena di Kuadran II nilai $y$ bernilai positif).'
        },
        {
          title: 'Langkah 2: Evaluasi Opsi A, B, C, D',
          explanation: '• $\\sin(\\theta) = \\frac{y}{r} = \\frac{4}{5}$. Opsi A BENAR.\n• $\\tan(\\theta) = \\frac{y}{x} = \\frac{4}{-3} = -\\frac{4}{3}$. Opsi B BENAR.\n• $\\csc(\\theta) = \\frac{1}{\\sin(\\theta)} = \\frac{5}{4}$ (bertanda positif di Kuadran II). Klaim $-\\frac{5}{4}$ salah. Opsi C SALAH.\n• $\\sec(\\theta) = \\frac{1}{\\cos(\\theta)} = -\\frac{5}{3}$ (bertanda negatif di Kuadran II). Klaim $\\frac{5}{3}$ salah tanda. Opsi D SALAH.'
        },
        {
          title: 'Langkah 3: Evaluasi Opsi E',
          explanation: '$$\\sin^2(\\theta) - \\cos^2(\\theta) = \\left(\\frac{4}{5}\\right)^2 - \\left(-\\frac{3}{5}\\right)^2 = \\frac{16}{25} - \\frac{9}{25} = \\frac{7}{25}$$\nOpsi E BENAR.'
        }
      ],
      conclusion: 'Tiga proposisi yang terbukti benar adalah Opsi A, B, dan E.'
    },
    quickSolution: {
      strategyName: 'Tripel Pythagoras 3-4-5 & Aturan Kuadran ASTC',
      steps: [
        {
          title: 'Kaidah Kuadran II (Semua - Sinus - Tangen - Kosinus)',
          explanation: 'Di Kuadran II, HANYA Sinus dan Kosekan yang bertanda positif. Kosinus, Tangen, Sekan, Kotangen bertanda negatif!'
        },
        {
          title: 'Periksa tanda kilat',
          explanation: '• Kosekan harus positif $\\to$ Opsi C gugur seketika!\n• Sekan harus negatif $\\to$ Opsi D (positif) gugur seketika!\n• $\\sin = +4/5$ (A benar), $\\tan = -4/3$ (B benar), selisih kuadrat $\\frac{16-9}{25} = \\frac{7}{25}$ (E benar).'
        }
      ],
      conclusion: 'Tiga opsi yang benar: A, B, dan E.'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Benar. Sinus di Kuadran II bernilai positif: y/r = 4/5.' },
      { label: 'B', isCorrect: true, explanation: 'Benar. Tangen di Kuadran II bernilai negatif: y/x = 4/(-3) = -4/3.' },
      { label: 'C', isCorrect: false, explanation: 'Salah. Kosekan adalah kebalikan sinus, di Kuadran II bernilai positif +5/4.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Sekan adalah kebalikan kosinus, di Kuadran II bernilai negatif -5/3.' },
      { label: 'E', isCorrect: true, explanation: 'Benar. (4/5)^2 - (-3/5)^2 = 16/25 - 9/25 = 7/25.' }
    ],
    misconceptions: [
      'Salah menetapkan tanda kosekan menjadi negatif karena terbawa tanda negatif dari kosinus.',
      'Lupa mengkuadratkan tanda negatif pada (-3/5)^2 sehingga mengira hasilnya 16/25 + 9/25 = 1.'
    ],
    keyTakeaway: 'Kaidah Kuadran: Pada Kuadran II, HANYA $\\sin(\\theta)$ dan $\\csc(\\theta)$ yang bernilai positif; seluruh perbandingan lainnya bernilai negatif.',
    narration: {
      introduction: 'Kita berada di soal nomor 20 mengenai perbandingan trigonometri kuadran, pilihan ganda kompleks.',
      stimulus: 'Sudut teta berada di Kuadran II dengan nilai kosinus teta minus 3 per 5. Perhatikan posisi koordinat pada lingkaran satuan.',
      question: 'Pilihlah semua proposisi yang pasti bernilai benar untuk sudut teta tersebut.',
      options: 'Opsi A menguji sinus 4 per 5. Opsi B menguji tangen minus 4 per 3. Opsi C menguji kosekan minus 5 per 4. Opsi D menguji sekan 5 per 3. Opsi E menguji selisih kuadrat sinus dan kosinus adalah 7 per 25.',
      preAnswerGuidance: 'Ingat jembatan keledai kuadran: Semua, Sinus, Tangen, Kosinus. Di Kuadran II hanya Sinus dan Kosekan yang positif!',
      correctFeedback: 'Hebat sekali! Pilihan A, B, dan E sangat tepat. Kamu menguasai tanda trigonometri kuadran dengan sempurna.',
      incorrectFeedback: 'Waspadai tanda positif dan negatif. Kosekan di kuadran dua bernilai positif. Mari kita simak ulasannya bersama Mister Jo.',
      normalIntroduction: 'Berikut pembuktian aljabar trigonometrinya.',
      normalSteps: [
        { title: 'Koordinat y', explanation: 'Akar dari 25 dikurang 9 adalah positif 4 karena berada di kuadran dua.' },
        { title: 'Sinus dan Tangen', explanation: 'Sinus adalah 4 per 5 positif, dan tangen adalah minus 4 per 3. Opsi A dan B Benar.' },
        { title: 'Kosekan dan Sekan', explanation: 'Kosekan seharusnya positif 5 per 4, dan sekan seharusnya minus 5 per 3. Opsi C dan D Salah.' },
        { title: 'Selisih Kuadrat', explanation: '16 per 25 dikurangi 9 per 25 adalah 7 per 25. Opsi E Benar.' }
      ],
      normalConclusion: 'Opsi yang benar adalah A, B, dan E.',
      quickIntroduction: 'Gunakan Cara Cepat eliminasi tanda dari Mister Jo.',
      quickSteps: [
        { title: 'Cek Tanda Kosekan', explanation: 'Kosekan kuadran dua wajib positif. Opsi C bertanda minus, langsung coret!' },
        { title: 'Cek Tanda Sekan', explanation: 'Sekan kuadran dua wajib negatif. Opsi D bertanda positif, langsung coret!' },
        { title: 'Hasil', explanation: 'Tersisa opsi A, B, dan E yang semuanya valid.' }
      ],
      quickConclusion: 'Pemeriksaan tanda kuadran mengeliminasi opsi salah tanpa menghitung rumus panjang.',
      misconception: 'Banyak peserta salah mengira semua fungsi trigonometri berawalan "ko-" bernilai negatif di kuadran dua.',
      simplerExplanation: 'Di Kuadran II, garis tegak y mengarah ke atas (positif) dan garis mendatar x mengarah ke kiri (negatif). Maka perbandingan apa pun yang memakai y tanpa x, yaitu sinus dan kebalikannya kosekan, PASTI positif!',
      nextQuestion: 'Mantap! Ayo kita beralih ke soal nomor 21: hubungan enam rasio trigonometri segitiga siku-siku.'
    }
  },

  // SOAL 21: Benar/Salah 3 Pernyataan
  {
    id: 'trigonometri-21',
    number: 21,
    element: 'Trigonometri',
    subtopic: 'Hubungan Dasar Enam Rasio Trigonometri',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Memvalidasi hubungan identitas timbal-balik dan nilai enam perbandingan trigonometri pada segitiga siku-siku.',
    difficultyLabel: 'Penalaran Sulit',
    difficultyParameter: 0.4,
    questionType: 'true_false_matrix',
    stimulusType: 'narrative_diagram',
    stimulus: 'Diberikan segitiga siku-siku $KLM$ yang siku-siku di titik $L$. Diketahui panjang sisi alas $KL = 12\\text{ cm}$ dan panjang sisi tegak $LM = 5\\text{ cm}$. Sudut lancip di titik sudut $K$ dinyatakan sebagai $\\alpha$.\n\nBerdasarkan definisi perbandingan trigonometri pada segitiga siku-siku, seorang penguji mengajukan 3 pernyataan evaluasi terkait nilai dari sinus, kosinus, tangen, sekan, kosekan, dan kotangen.',
    visualData: {
      type: 'svg',
      svgType: 'right_triangle_ratios',
      altText: 'Segitiga siku-siku KLM di L dengan alas KL=12 cm, tegak LM=5 cm, dan sudut alfa di K'
    },
    questionText: 'Tentukan apakah masing-masing pernyataan berikut BENAR atau SALAH!',
    statements: [
      {
        id: 's21-1',
        statement: 'Panjang sisi miring $KM$ adalah $13\\text{ cm}$, sehingga nilai $\\sin(\\alpha) = \\frac{5}{13}$ dan $\\cos(\\alpha) = \\frac{12}{13}$.',
        reason: 'Tripel Pythagoras 5-12-13: KM = √(12^2 + 5^2) = 13. Sisi depan = LM = 5, sisi samping = KL = 12.'
      },
      {
        id: 's21-2',
        statement: 'Nilai dari perkalian $\\tan(\\alpha) \\cdot \\cot(\\alpha)$ sama dengan 1, dan nilai $\\sec(\\alpha) = \\frac{13}{12}$.',
        reason: 'tan(α) * cot(α) = 1 (saling berkebalikan), dan sec(α) = 1/cos(α) = 13/12.'
      },
      {
        id: 's21-3',
        statement: 'Nilai dari ekspresi identitas $\\sec^2(\\alpha) - \\tan^2(\\alpha) = \\frac{25}{144}$.',
        reason: 'Identitas Pythagoras trigonometri menyatakan sec^2(α) - tan^2(α) = 1 untuk setiap sudut alfa, bukan 25/144!'
      }
    ],
    // Statements:
    // 1: KM = 13, sin(\alpha) = 5/13, cos(\alpha) = 12/13. (BENAR)
    // 2: tan(\alpha) * cot(\alpha) = 1, sec(\alpha) = 13/12. (BENAR)
    // 3: sec^2(\alpha) - tan^2(\alpha) = 25/144?
    // Let's check: sec = 13/12 => sec^2 = 169/144.
    // tan = 5/12 => tan^2 = 25/144.
    // sec^2 - tan^2 = (169 - 25)/144 = 144/144 = 1!
    // The statement claims it is 25/144 (which is tan^2, not sec^2 - tan^2!).
    // So Statement 3 is SALAH!
    // Result: [true, true, false]
    correctAnswer: [true, true, false],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Pernyataan 1 (Panjang Sisi Miring dan Sin-Cos)',
          explanation: 'Berdasarkan Teorema Pythagoras:\n$$KM = \\sqrt{KL^2 + LM^2} = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13\\text{ cm}$$\nUntuk sudut $\\alpha$ di titik $K$:\n• Sisi depan $= LM = 5\\text{ cm}$\n• Sisi samping $= KL = 12\\text{ cm}$\n• Sisi miring $= KM = 13\\text{ cm}$\n$$\\sin(\\alpha) = \\frac{\\text{depan}}{\\text{miring}} = \\frac{5}{13}, \\quad \\cos(\\alpha) = \\frac{\\text{samping}}{\\text{miring}} = \\frac{12}{13}$$\nPernyataan 1 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 2 (Perkalian Timbal-Balik dan Sekan)',
          explanation: '$\\tan(\\alpha) = \\frac{5}{12}$ dan $\\cot(\\alpha) = \\frac{12}{5}$.\nMaka $\\tan(\\alpha) \\cdot \\cot(\\alpha) = \\frac{5}{12} \\times \\frac{12}{5} = 1$.\n$\\sec(\\alpha) = \\frac{1}{\\cos(\\alpha)} = \\frac{\\text{miring}}{\\text{samping}} = \\frac{13}{12}$.\nPernyataan 2 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 3 (Identitas Pythagoras Trigonometri)',
          explanation: 'Berdasarkan identitas mutlak trigonometri:\n$$1 + \\tan^2(\\alpha) = \\sec^2(\\alpha) \\iff \\sec^2(\\alpha) - \\tan^2(\\alpha) = 1$$\nUji numerik: $\\left(\\frac{13}{12}\\right)^2 - \\left(\\frac{5}{12}\\right)^2 = \\frac{169}{144} - \\frac{25}{144} = \\frac{144}{144} = 1$.\nKlaim yang menyatakan hasilnya $\\frac{25}{144}$ adalah salah (angka tersebut adalah $\\tan^2(\\alpha)$ saja). Pernyataan 3 SALAH.'
        }
      ],
      conclusion: 'Hasil evaluasi: Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.'
    },
    quickSolution: {
      strategyName: 'Tripel 5-12-13 & Identitas Dasar = 1',
      steps: [
        {
          title: 'Tripel Pythagoras',
          explanation: 'Sisi 5 dan 12 pasti menghasilkan miring 13. Maka $\\sin = 5/13, \\cos = 12/13$ (Pernyataan 1 Benar).'
        },
        {
          title: 'Kebalikan',
          explanation: 'Tangen kali kotangen selalu 1, dan sekan adalah kebalikan kosinus yaitu 13/12 (Pernyataan 2 Benar).'
        },
        {
          title: 'Identitas Pythagoras',
          explanation: '$\\sec^2 - \\tan^2 = 1$ mutlak untuk sudut apapun! Mengaku $\\frac{25}{144}$ adalah kesalahan fatal (Pernyataan 3 Salah).'
        }
      ],
      conclusion: 'Status: [BENAR, BENAR, SALAH].'
    },
    optionExplanations: [
      { label: 'Pernyataan 1', isCorrect: true, explanation: 'Benar. Tripel Pythagoras 5-12-13 menghasilkan sisi miring 13, sin = 5/13 dan cos = 12/13.' },
      { label: 'Pernyataan 2', isCorrect: true, explanation: 'Benar. tan(α) x cot(α) = 1 dan sec(α) = 1/cos(α) = 13/12.' },
      { label: 'Pernyataan 3', isCorrect: false, explanation: 'Salah. Identitas sec^2(α) - tan^2(α) selalu bernilai tepat 1, bukan 25/144.' }
    ],
    misconceptions: [
      'Salah memasukkan sisi depan dan samping: mengira sisi depan sudut K adalah KL (12 cm), padahal sisi depan adalah LM (5 cm).',
      'Lupa mengurangkan 169 dengan 25, sehingga mengira sec^2 - tan^2 sama dengan tan^2.'
    ],
    keyTakeaway: 'Identitas Pythagoras $\\sec^2(\\theta) - \\tan^2(\\theta) = 1$ berlaku universal untuk semua sudut di mana fungsi tersebut terdefinisi, turunan dari $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$.',
    narration: {
      introduction: 'Kita berada di soal nomor 21, evaluasi Benar atau Salah pada enam rasio trigonometri segitiga siku-siku.',
      stimulus: 'Segitiga siku-siku KLM dengan alas 12 cm dan tinggi 5 cm memiliki sudut lancip alfa di titik K.',
      question: 'Tentukan apakah masing-masing dari ketiga pernyataan berikut bernilai Benar atau Salah.',
      options: 'Pernyataan satu menguji sisi miring 13 cm beserta nilai sinus dan kosinus. Pernyataan dua menguji perkalian tangen-kotangen dan nilai sekan. Pernyataan tiga menguji identitas sekan kuadrat dikurang tangen kuadrat.',
      preAnswerGuidance: 'Ingat tripel 5, 12, 13, dan ingat identitas mutlak trigonometri yang selalu bernilai satu!',
      correctFeedback: 'Tepat sekali! Urutan penilaianmu Benar, Benar, Salah sangat tajam.',
      incorrectFeedback: 'Perhatikan identitas sekan kuadrat dikurang tangen kuadrat: nilainya selalu tepat 1. Mari simak ulasannya bersama Mister Jo.',
      normalIntroduction: 'Berikut pembuktian aljabar trigonometrinya.',
      normalSteps: [
        { title: 'Tripel Pythagoras', explanation: 'Akar dari 144 tambah 25 adalah 13 cm. Sinus 5 per 13 dan kosinus 12 per 13. Pernyataan 1 Benar.' },
        { title: 'Invers dan Perkalian', explanation: 'Tangen dikali kotangen selalu 1, dan sekan adalah 13 per 12. Pernyataan 2 Benar.' },
        { title: 'Identitas Trigonometri', explanation: '169 per 144 dikurang 25 per 144 adalah 144 per 144 yaitu tepat 1, bukan 25 per 144. Pernyataan 3 Salah.' }
      ],
      normalConclusion: 'Status penilaian: Benar, Benar, Salah.',
      quickIntroduction: 'Gunakan Cara Cepat identitas dari Mister Jo.',
      quickSteps: [
        { title: 'Tripel Cepat', explanation: '5 dan 12 pasti berteman dengan 13. Pernyataan 1 langsung Benar.' },
        { title: 'Identitas 1 Detik', explanation: 'sekan kuadrat minus tangen kuadrat pasti 1! Angka 25 per 144 langsung divonis Salah.' }
      ],
      quickConclusion: 'Penguasaan identitas dasar membuat soal ini terselesaikan dengan sangat cepat.',
      misconception: 'Banyak peserta tertukar antara sisi depan dan sisi samping karena salah memandang posisi sudut alfa.',
      simplerExplanation: 'Bayangkan segitiga dengan alas 12 dan tegak 5. Sisi miringnya pasti 13. Aturan dasar matematika menyatakan sekan kuadrat dikurangi tangen kuadrat nilainya SELALU 1, apapun ukuran segitiganya!',
      nextQuestion: 'Bagus! Ayo kita melangkah ke soal nomor 22: pemodelan trigonometri observasi sudut bayangan.'
    }
  },

  // SOAL 22: PG 5 opsi
  {
    id: 'trigonometri-22',
    number: 22,
    element: 'Trigonometri',
    subtopic: 'Pemodelan Trigonometri & Pengamatan Bayangan',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Menganalisis dan menyatukan beberapa data sudut elevasi pengamatan berkala untuk memvalidasi model tinggi objek.',
    difficultyLabel: 'Penalaran Sulit',
    difficultyParameter: 0.7,
    questionType: 'single_choice',
    stimulusType: 'narrative_table',
    stimulus: 'Sebuah stasiun cuaca mencatat pergerakan sudut elevasi matahari dan panjang bayangan sebuah tiang anemometer vertikal pada tiga waktu observasi yang berbeda di hari yang sama:\n\n• Pukul 09.00: Sudut elevasi matahari $\\alpha = 30^\\circ$, panjang bayangan terukur $s_1$.\n• Pukul 10.30: Sudut elevasi matahari $\\beta = 45^\\circ$, panjang bayangan terukur $s_2$.\n• Pukul 12.00: Sudut elevasi matahari $\\gamma = 60^\\circ$, panjang bayangan terukur $s_3$.\n\nSelisih panjang bayangan antara pengamatan pukul 09.00 dan pukul 10.30 terukur sebesar $s_1 - s_2 = 10(\\sqrt{3} - 1)\\text{ meter}$.',
    visualData: {
      type: 'table',
      tableData: {
        caption: 'Catatan Observasi Sudut Elevasi Matahari & Panjang Bayangan Anemometer',
        headers: ['Waktu Observasi', 'Sudut Elevasi', 'Nilai Tangen Sudut', 'Panjang Bayangan'],
        rows: [
          ['09.00', '30°', 'tan(30°) = 1/√3', 's₁ = H / tan(30°) = H√3'],
          ['10.30', '45°', 'tan(45°) = 1', 's₂ = H / tan(45°) = H'],
          ['12.00', '60°', 'tan(60°) = √3', 's₃ = H / tan(60°) = H / √3']
        ]
      },
      altText: 'Tabel hubungan sudut elevasi 30, 45, 60 derajat dengan panjang bayangan tiang'
    },
    questionText: 'Berdasarkan model matematis di atas, berapakah tinggi tiang anemometer $H$ dan berapakah panjang bayangan tiang pada pukul 12.00 ($s_3$)?',
    options: [
      'Tinggi tiang $H = 10\\text{ meter}$ dan panjang bayangan $s_3 = \\frac{10}{3}\\sqrt{3}\\text{ meter}$',
      'Tinggi tiang $H = 10\\sqrt{3}\\text{ meter}$ dan panjang bayangan $s_3 = 10\\text{ meter}$',
      'Tinggi tiang $H = 20\\text{ meter}$ dan panjang bayangan $s_3 = \\frac{20}{3}\\sqrt{3}\\text{ meter}$',
      'Tinggi tiang $H = 10\\text{ meter}$ dan panjang bayangan $s_3 = 5\\sqrt{3}\\text{ meter}$',
      'Tinggi tiang $H = 15\\text{ meter}$ dan panjang bayangan $s_3 = 5\\sqrt{3}\\text{ meter}$'
    ],
    // Analysis:
    // Let height of anemometer = H.
    // At 09.00: tan(30) = H / s_1 => s_1 = H / tan(30) = H \sqrt{3}.
    // At 10.30: tan(45) = H / s_2 => s_2 = H / tan(45) = H.
    // Given: s_1 - s_2 = 10(\sqrt{3} - 1).
    // H \sqrt{3} - H = 10(\sqrt{3} - 1) => H(\sqrt{3} - 1) = 10(\sqrt{3} - 1) => H = 10 meters!
    // At 12.00: tan(60) = H / s_3 => s_3 = H / tan(60) = 10 / \sqrt{3} = (10/3) \sqrt{3} meters!
    // Result: H = 10 m, s_3 = (10/3)\sqrt{3} m.
    // Matches Option A!
    correctAnswer: 0,
    normalSolution: {
      steps: [
        {
          title: 'Langkah 1: Menyatakan panjang bayangan s_1 dan s_2 sebagai fungsi H',
          explanation: 'Pada segitiga siku-siku bayangan tiang:\n$$\\tan(\\theta) = \\frac{H}{s} \\Rightarrow s = \\frac{H}{\\tan(\\theta)}$$\n• Pukul 09.00 ($\\alpha = 30^\\circ$): $s_1 = \\frac{H}{\\tan(30^\\circ)} = \\frac{H}{1/\\sqrt{3}} = H\\sqrt{3}$.\n• Pukul 10.30 ($\\beta = 45^\\circ$): $s_2 = \\frac{H}{\\tan(45^\\circ)} = \\frac{H}{1} = H$.'
        },
        {
          title: 'Langkah 2: Menghitung tinggi tiang H dari selisih bayangan',
          explanation: 'Diketahui $s_1 - s_2 = 10(\\sqrt{3} - 1)$:\n$$H\\sqrt{3} - H = 10(\\sqrt{3} - 1)$$\n$$H(\\sqrt{3} - 1) = 10(\\sqrt{3} - 1) \\Rightarrow H = 10\\text{ meter}$$\nTinggi tiang anemometer adalah 10 meter.'
        },
        {
          title: 'Langkah 3: Menghitung panjang bayangan pukul 12.00 (s_3)',
          explanation: 'Pada pukul 12.00 ($\\gamma = 60^\\circ$):\n$$s_3 = \\frac{H}{\\tan(60^\\circ)} = \\frac{10}{\\sqrt{3}} = \\frac{10\\sqrt{3}}{3} = \\frac{10}{3}\\sqrt{3}\\text{ meter}$$'
        }
      ],
      conclusion: 'Tinggi tiang $H = 10\\text{ meter}$ dan panjang bayangan pada pukul 12.00 adalah $s_3 = \\frac{10}{3}\\sqrt{3}\\text{ meter}$ (Opsi A).'
    },
    quickSolution: {
      strategyName: 'Faktorisasi Bentuk Aljabar (√3 - 1)',
      steps: [
        {
          title: 'Perhatikan suku (√3 - 1)',
          explanation: '$s_1 - s_2 = H(\\tan^{-1}(30) - \\tan^{-1}(45)) = H(\\sqrt{3} - 1)$. Karena nilainya $10(\\sqrt{3} - 1)$, langsung terbaca $H = 10\\text{ meter}$ tanpa mencoret kertas!'
        },
        {
          title: 'Bagi langsung dengan √3',
          explanation: '$s_3 = \\frac{10}{\\sqrt{3}} = \\frac{10}{3}\\sqrt{3}\\text{ meter}$. Opsi A terkunci dalam 10 detik!'
        }
      ],
      conclusion: 'Hanya dengan mencocokkan koefisien bentuk $(\\sqrt{3} - 1)$, Opsi A langsung terpilih.'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Tepat. H = 10 meter dan s3 = 10/√3 = (10/3)√3 meter.' },
      { label: 'B', isCorrect: false, explanation: 'Salah. Tertukar antara tinggi H dan panjang bayangan s1.' },
      { label: 'C', isCorrect: false, explanation: 'Salah. Mengalikan H dengan 2 tanpa alasan matematis.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. 10 dibagi √3 menghasilkan 10√3/3, bukan 5√3.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. Nilai H = 15 tidak memenuhi selisih 10(√3 - 1).' }
    ],
    misconceptions: [
      'Menghitung rasio bayangan dengan membagi sudut secara proporsional (mengira bayangan pada 60° adalah setengah dari 30°), padahal fungsi tangen bersifat non-linear.',
      'Lupa merasionalkan penyebut pada 10 / akar 3.'
    ],
    keyTakeaway: 'Panjang bayangan berbanding terbalik dengan nilai tangen sudut elevasi ($s = \\frac{H}{\\tan \\theta}$). Selalu rasionalkan bentuk akar di penyebut.',
    narration: {
      introduction: 'Tantangan nomor 22 menguji kemampuan pemodelan trigonometrimu pada pergerakan bayangan matahari.',
      stimulus: 'Data elevasi matahari di stasiun cuaca: pukul 9 sudut 30 derajat, pukul 10.30 sudut 45 derajat, dan pukul 12 sudut 60 derajat. Selisih bayangan dua waktu awal adalah 10 dikali akar 3 minus 1 meter.',
      question: 'Berapakah tinggi tiang anemometer dan berapakah panjang bayangan pada pukul 12?',
      options: 'Opsi A: Tinggi 10 meter dan bayangan 10 per 3 akar 3 meter. Opsi B: 10 akar 3 dan 10 meter. Opsi C: 20 meter dan 20 per 3 akar 3. Opsi D: 10 meter dan 5 akar 3. Opsi E: 15 meter dan 5 akar 3.',
      preAnswerGuidance: 'Perhatikan suku akar 3 minus 1: jika difaktorkan dengan H, kamu bisa langsung melihat tinggi H tanpa rumus rumit!',
      correctFeedback: 'Brilian! Pilihan A sangat tepat. Kamu melihat kesamaan koefisien dengan sangat jeli.',
      incorrectFeedback: 'Hati-hati saat merasionalkan 10 dibagi akar 3. Mari kita simak langkah lengkapnya bersama Mister Jo.',
      normalIntroduction: 'Berikut adalah alur penyelesaian normal.',
      normalSteps: [
        { title: 'Panjang Bayangan', explanation: 'Bayangan 1 adalah H akar 3, bayangan 2 adalah H.' },
        { title: 'Faktorisasi H', explanation: 'H dikali akar 3 minus 1 sama dengan 10 dikali akar 3 minus 1, sehingga H tepat 10 meter.' },
        { title: 'Bayangan Pukul 12', explanation: '10 dibagi tangen 60 derajat adalah 10 per akar 3, dirasionalkan menjadi 10 per 3 akar 3 meter.' }
      ],
      normalConclusion: 'Hasil akhir adalah opsi A.',
      quickIntroduction: 'Lihat Cara Cepat koefisien identik dari Mister Jo!',
      quickSteps: [
        { title: 'Coret Faktor Identik', explanation: 'Suku akar 3 minus 1 di kiri dan kanan saling mencoret, menyisakan H = 10 langsung!' },
        { title: 'Bagi Cepat', explanation: '10 dibagi akar 3 adalah 10 per 3 akar 3 meter. Opsi A selesai dalam 10 detik!' }
      ],
      quickConclusion: 'Melihat pola aljabar identik memangkas waktu hitung secara drastis.',
      misconception: 'Banyak peserta mengira sudut yang naik dua kali lipat membuat panjang bayangan menyusut tepat setengahnya.',
      simplerExplanation: 'Makin siang matahari makin tinggi, sehingga bayangan makin memendek. Pada sudut 45 derajat tingginya sama dengan panjang bayangannya yaitu 10 meter. Pada sudut 60 derajat bayangannya makin pendek lagi menjadi 10 dibagi akar 3 meter!',
      nextQuestion: 'Hebat! Mari kita masuki soal nomor 23: rancangan atap miring dan rasio tangen-sekan.'
    }
  },

  // SOAL 23: PG Kompleks 5 opsi (2-3 benar)
  {
    id: 'trigonometri-23',
    number: 23,
    element: 'Trigonometri',
    subtopic: 'Rasio Trigonometri, Sudut Kemiringan & Geometri Atap',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Mengevaluasi beberapa alternatif keputusan sudut kemiringan lereng atap berdasarkan batas toleransi curah hujan.',
    difficultyLabel: 'Penalaran Sangat Sulit',
    difficultyParameter: 1.3,
    questionType: 'multiple_choice',
    stimulusType: 'narrative_diagram',
    stimulus: 'Dalam standar arsitektur tropis, kemiringan atap genteng beton mensyaratkan sudut kemiringan $\\beta$ dengan batas toleransi $\\tan(\\beta) \\ge \\frac{3}{4}$ agar air hujan mengalir deras tanpa risiko bocor balik. Sebuah gedung memiliki bentang horizontal separuh atap selebar $D = 8\\text{ meter}$. Arsitek mendesain tinggi bubungan atap $H$ dan panjang lereng miring $L$ dengan sudut kemiringan $\\beta$ yang memenuhi $\\tan(\\beta) = \\frac{3}{4}$.',
    visualData: {
      type: 'svg',
      svgType: 'roof_truss',
      altText: 'Diagram penampang atap: bentang D=8 m, tinggi bubungan H, panjang lereng L, kemiringan tan beta = 3/4'
    },
    questionText: 'Pilihlah SEMUA pernyataan di bawah ini yang bernilai BENAR terkait desain konstruksi atap tersebut! (Pilihlah 2 atau 3 jawaban yang tepat)',
    options: [
      'Tinggi bubungan atap $H$ yang dirancang adalah $6\\text{ meter}$.',
      'Panjang lereng miring atap $L$ adalah $10\\text{ meter}$.',
      'Nilai perbandingan $\\cos(\\beta) = \\frac{4}{5}$ dan $\\sin(\\beta) = \\frac{3}{5}$.',
      'Jika tinggi bubungan dinaikkan menjadi $H = 8\\text{ meter}$, sudut kemiringan atap menjadi $\\beta = 60^\\circ$.',
      'Nilai perbandingan $\\sec(\\beta) = \\frac{5}{3}$.'
    ],
    // Analysis:
    // D = 8 m (horizontal run / adjacent).
    // tan(\beta) = 3/4 = H / D => H = D * (3/4) = 8 * (3/4) = 6 meters!
    // So Statement 1 (A): H = 6 meters -> TRUE!
    // L = \sqrt{D^2 + H^2} = \sqrt{8^2 + 6^2} = \sqrt{64 + 36} = \sqrt{100} = 10 meters!
    // So Statement 2 (B): L = 10 meters -> TRUE!
    // Right triangle 6-8-10 with respect to angle \beta:
    // opposite = H = 6, adjacent = D = 8, hypotenuse = L = 10.
    // \sin(\beta) = 6/10 = 3/5.
    // \cos(\beta) = 8/10 = 4/5.
    // So Statement 3 (C): \cos(\beta) = 4/5 and \sin(\beta) = 3/5 -> TRUE!
    // Wait, let's check statements 4 and 5:
    // If H = 8 m, then with D = 8 m, tan(\beta) = 8/8 = 1 => \beta = 45°, NOT 60°! (Statement 4 is FALSE!).
    // Statement 5: \sec(\beta) = 1 / \cos(\beta) = 1 / (4/5) = 5/4, NOT 5/3 (5/3 is csc(\beta)!). (Statement 5 is FALSE!).
    // That means Statements A (0), B (1), C (2) are the 3 TRUE options!
    // Exactly 3 options correct!
    correctAnswer: [0, 1, 2],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Opsi A: Menghitung tinggi bubungan H',
          explanation: 'Berdasarkan definisi tangen sudut kemiringan pada $\\triangle$ siku-siku atap:\n$$\\tan(\\beta) = \\frac{H}{D} \\Rightarrow \\frac{3}{4} = \\frac{H}{8} \\Rightarrow H = \\frac{3}{4} \\times 8 = 6\\text{ meter}$$\nOpsi A BENAR.'
        },
        {
          title: 'Evaluasi Opsi B: Menghitung panjang lereng miring L',
          explanation: 'Panjang lereng $L$ adalah hipotenusa:\n$$L = \\sqrt{D^2 + H^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ meter}$$\nOpsi B BENAR.'
        },
        {
          title: 'Evaluasi Opsi C: Nilai sinus dan kosinus sudut kemiringan',
          explanation: '• $\\cos(\\beta) = \\frac{\\text{samping}}{\\text{miring}} = \\frac{D}{L} = \\frac{8}{10} = \\frac{4}{5}$.\n• $\\sin(\\beta) = \\frac{\\text{depan}}{\\text{miring}} = \\frac{H}{L} = \\frac{6}{10} = \\frac{3}{5}$.\nOpsi C BENAR.'
        },
        {
          title: 'Evaluasi Opsi D: Kenaikan tinggi H = 8 meter',
          explanation: 'Jika $H = 8\\text{ m}$ dan $D = 8\\text{ m}$, maka $\\tan(\\beta) = \\frac{8}{8} = 1 \\Rightarrow \\beta = 45^\\circ$ (bukan $60^\\circ$, karena $\\tan(60^\\circ) = \\sqrt{3} \\approx 1,732$). Opsi D SALAH.'
        },
        {
          title: 'Evaluasi Opsi E: Nilai sekan sudut beta',
          explanation: '$$\\sec(\\beta) = \\frac{1}{\\cos(\\beta)} = \\frac{1}{4/5} = \\frac{5}{4}$$\nKlaim $\\frac{5}{3}$ adalah nilai $\\csc(\\beta) = \\frac{1}{\\sin(\\beta)} = \\frac{5}{3}$. Opsi E SALAH.'
        }
      ],
      conclusion: 'Tiga pernyataan yang terbukti benar adalah Opsi A, B, dan C.'
    },
    quickSolution: {
      strategyName: 'Tripel Pythagoras 3-4-5 Berskala 2x',
      steps: [
        {
          title: 'Kenali rasio 3 : 4 : 5',
          explanation: 'Tangen $= 3/4$. Sisi samping $= 8$ (yaitu $4 \\times 2$).\nMaka tinggi $= 3 \\times 2 = 6\\text{ m}$ (A benar). Sisi miring $= 5 \\times 2 = 10\\text{ m}$ (B benar).'
        },
        {
          title: 'Rasio dasar trigonometri',
          explanation: 'Cos $= 4/5$, Sin $= 3/5$ (C benar). Sec $= 5/4$ (E salah). Jika tinggi $= 8$, $\\tan = 1 \\to 45^\\circ$ (D salah).'
        }
      ],
      conclusion: 'Pernyataan benar terkunci seketika: A, B, dan C.'
    },
    optionExplanations: [
      { label: 'A', isCorrect: true, explanation: 'Benar. H = 8 x (3/4) = 6 meter.' },
      { label: 'B', isCorrect: true, explanation: 'Benar. Sisi miring L = √(8^2 + 6^2) = √100 = 10 meter.' },
      { label: 'C', isCorrect: true, explanation: 'Benar. cos(β) = 8/10 = 4/5 dan sin(β) = 6/10 = 3/5.' },
      { label: 'D', isCorrect: false, explanation: 'Salah. Jika H = 8 dan D = 8, tan(β) = 1 sehingga β = 45°, bukan 60°.' },
      { label: 'E', isCorrect: false, explanation: 'Salah. sec(β) = 1/cos(β) = 5/4, sedangkan 5/3 adalah csc(β).' }
    ],
    misconceptions: [
      'Tertukar antara nilai sekan (1/cos = 5/4) dengan nilai kosekan (1/sin = 5/3).',
      'Mengira rasio sisi yang sama (8 dan 8) menghasilkan sudut 60 derajat karena teringat segitiga sama sisi.'
    ],
    keyTakeaway: 'Rasio tangen $3/4$ adalah penanda langsung segitiga siku-siku $3 : 4 : 5$. Kalikan dengan faktor skala untuk memperoleh seluruh dimensi tanpa rumus rumit.',
    narration: {
      introduction: 'Sekarang kita masuk ke soal nomor 23, pilihan ganda kompleks konstruksi atap tropis.',
      stimulus: 'Bentang mendatar separuh atap adalah 8 meter dengan kemiringan tangen beta sama dengan 3 per 4.',
      question: 'Pilihlah seluruh pernyataan desain konstruksi atap yang bernilai benar.',
      options: 'Opsi A menguji tinggi bubungan 6 meter. Opsi B menguji panjang lereng 10 meter. Opsi C menguji nilai kosinus 4 per 5 dan sinus 3 per 5. Opsi D menguji jika tinggi 8 meter sudutnya 60 derajat. Opsi E menguji sekan beta sama dengan 5 per 3.',
      preAnswerGuidance: 'Perhatikan perbandingan 3 banding 4: kalikan dengan 2 untuk mendapatkan tripel 6, 8, 10!',
      correctFeedback: 'Luar biasa! Pilihan A, B, dan C sangat tepat. Analisis trigonometri terapanmu sangat tajam.',
      incorrectFeedback: 'Perhatikan nilai sekan: sekan adalah kebalikan kosinus yaitu 5 per 4, bukan 5 per 3. Mari simak ulasannya.',
      normalIntroduction: 'Berikut adalah alur penyelesaian normal.',
      normalSteps: [
        { title: 'Tinggi Bubungan', explanation: '8 dikali 3 per 4 menghasilkan 6 meter. Opsi A Benar.' },
        { title: 'Panjang Lereng', explanation: 'Akar dari 8 kuadrat tambah 6 kuadrat adalah 10 meter. Opsi B Benar.' },
        { title: 'Sinus dan Kosinus', explanation: 'Kosinus adalah 8 per 10 atau 4 per 5, sinus 6 per 10 atau 3 per 5. Opsi C Benar.' },
        { title: 'Opsi D dan E', explanation: 'Tinggi 8 menghasilkan sudut 45 derajat, dan sekan adalah 5 per 4. Opsi D dan E Salah.' }
      ],
      normalConclusion: 'Pilihan yang benar adalah A, B, dan C.',
      quickIntroduction: 'Gunakan Cara Cepat tripel 3-4-5 berskala 2 dari Mister Jo.',
      quickSteps: [
        { title: 'Tripel 3-4-5', explanation: 'Sisi alas 8 adalah 4 dikali 2. Maka tingginya 3 dikali 2 = 6, dan miringnya 5 dikali 2 = 10!' },
        { title: 'Rasio Kilat', explanation: 'Cos = 4/5, Sin = 3/5. Langsung opsi A, B, C benar.' }
      ],
      quickConclusion: 'Pengenalan tripel dasar menghemat waktu pengerjaan ujian secara signifikan.',
      misconception: 'Banyak peserta tertukar antara definisi sekan (1/cos) dan kosekan (1/sin).',
      simplerExplanation: 'Segitiga atap ini adalah perbesaran 2 kali dari segitiga siku-siku 3, 4, 5. Jadi ukurannya adalah tinggi 6, alas 8, dan lereng 10 meter!',
      nextQuestion: 'Hebat! Ayo kita tuntaskan Elemen Trigonometri di soal nomor 24 tentang pengukuran lebar sungai.'
    }
  },

  // SOAL 24: Benar/Salah 3 Pernyataan
  {
    id: 'trigonometri-24',
    number: 24,
    element: 'Trigonometri',
    subtopic: 'Pengukuran Tak Langsung Objek Tak Terjangkau & Validasi Asumsi',
    cognitiveLevel: 'REASONING',
    reasoningIndicator: 'Mengidentifikasi kesalahan asumsi sudut siku-siku dan memvalidasi kesahihan tiga hasil pengukuran jarak tak langsung.',
    difficultyLabel: 'Penalaran Sangat Sulit',
    difficultyParameter: 1.6,
    questionType: 'true_false_matrix',
    stimulusType: 'narrative_diagram',
    stimulus: 'Regu Pramuka Penegak ingin menaksir lebar sungai $W$ yang arusnya deras tanpa menyeberanginya:\n• Di seberang sungai terdapat sebuah pohon pinus $P$.\n• Di tepi dekat sungai, dibuat garis lintasan lurus dari patok $A$ ke patok $B$ sepanjang $AB = 30\\text{ meter}$. Garis $AB$ tegak lurus terhadap garis pandang $AP$ (sehingga $\\angle PAB = 90^\\circ$ siku-siku, dengan $AP = W$ adalah lebar sungai).\n• Dari patok $B$, sudut pandang ke pohon pinus $P$ terukur $\\angle PBA = 60^\\circ$.\n\nSeorang anggota regu mengajukan tiga klaim pengukuran untuk menentukan lebar sungai dan jarak pandang miring $BP$.',
    visualData: {
      type: 'table',
      tableData: {
        caption: 'Parameter Pengukuran Tak Langsung Lebar Sungai (∠PAB = 90°)',
        headers: ['Elemen Geometri', 'Notasi Pengukuran', 'Nilai / Hubungan Sudut'],
        rows: [
          ['Panjang Garis Dasar Tepi', 'AB', '30 meter'],
          ['Sudut Garis Pandang di A', '∠PAB', '90° (Tegak lurus terhadap tepi)'],
          ['Sudut Pandang di B', '∠PBA', '60°'],
          ['Lebar Sungai yang Dicari', 'AP = W', 'W = AB · tan(60°)']
        ]
      },
      altText: 'Tabel parameter pengukuran lebar sungai sudut 60 derajat dan garis dasar 30 m'
    },
    questionText: 'Tentukan apakah masing-masing pernyataan evaluasi teknis berikut BENAR atau SALAH!',
    statements: [
      {
        id: 's24-1',
        statement: 'Lebar sungai $W$ (panjang ruas $AP$) adalah $30\\sqrt{3}\\text{ meter}$ (sekitar $51,96\\text{ meter}$).',
        reason: 'tan(60°) = W / AB => W = 30 * √3 = 30√3 meter.'
      },
      {
        id: 's24-2',
        statement: 'Jarak pandang langsung dari patok $B$ ke pohon pinus $P$ (panjang ruas miring $BP$) adalah $60\\text{ meter}$.',
        reason: 'cos(60°) = AB / BP => 1/2 = 30 / BP => BP = 60 meter.'
      },
      {
        id: 's24-3',
        statement: 'Jika patok $A$ tidak tegak lurus dan $\\angle PAB$ ternyata sebesar $85^\\circ$, rumus $W = 30\\tan(60^\\circ)$ tetap memberikan hasil lebar yang akurat tanpa perlu aturan sinus.',
        reason: 'Rumus tangen hanya berlaku pada segitiga siku-siku; jika sudutnya bukan 90°, wajib menggunakan Aturan Sinus agar tidak bias.'
      }
    ],
    // Statements:
    // 1: W = 30 \tan(60°) = 30 \sqrt{3} meter. (BENAR)
    // 2: cos(60°) = AB / BP => 1/2 = 30 / BP => BP = 60 meter. (BENAR)
    // 3: Jika sudut bukan 90° rumus tangen tetap akurat tanpa aturan sinus -> (SALAH - asumsi siku-siku runtuh!).
    // Result: [true, true, false]
    correctAnswer: [true, true, false],
    normalSolution: {
      steps: [
        {
          title: 'Evaluasi Pernyataan 1 (Lebar Sungai AP)',
          explanation: 'Pada $\\triangle PAB$ yang siku-siku di $A$:\n$$\\tan(\\angle PBA) = \\frac{\\text{sisi depan}}{\\text{sisi samping}} = \\frac{AP}{AB}$$\n$$\\tan(60^\\circ) = \\frac{W}{30} \\Rightarrow \\sqrt{3} = \\frac{W}{30} \\Rightarrow W = 30\\sqrt{3}\\text{ meter}$$\nPernyataan 1 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 2 (Jarak Pandang Miring BP)',
          explanation: 'Gunakan perbandingan kosinus pada sudut $60^\\circ$:\n$$\\cos(\\angle PBA) = \\frac{AB}{BP} \\Rightarrow \\cos(60^\\circ) = \\frac{30}{BP}$$\n$$\\frac{1}{2} = \\frac{30}{BP} \\Rightarrow BP = 2 \\times 30 = 60\\text{ meter}$$\nAtau menggunakan Teorema Pythagoras: $BP = \\sqrt{30^2 + (30\\sqrt{3})^2} = \\sqrt{900 + 2700} = \\sqrt{3600} = 60\\text{ meter}$.\nPernyataan 2 BENAR.'
        },
        {
          title: 'Evaluasi Pernyataan 3 (Keabsahan Asumsi Siku-Siku)',
          explanation: 'Perbandingan trigonometri dasar (sinus, kosinus, tangen sederhana $\\frac{\\text{depan}}{\\text{samping}}$) HANYA berlaku sah apabila salah satu sudut segitiga tepat $90^\\circ$ (siku-siku).\nJika $\\angle PAB = 85^\\circ$, maka $\\triangle PAB$ adalah segitiga sembarang dan perhitungan wajib menggunakan Aturan Sinus:\n$$\\frac{W}{\\sin(60^\\circ)} = \\frac{AB}{\\sin(\\angle APB)}$$\nMengabaikan penyimpangan sudut $5^\\circ$ akan menghasilkan galat (error) pengukuran yang fatal. Pernyataan 3 SALAH.'
        }
      ],
      conclusion: 'Hasil evaluasi: Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.'
    },
    quickSolution: {
      strategyName: 'Rasio Segitiga Istimewa 30-60-90 & Uji Syarat',
      steps: [
        {
          title: 'Perbandingan sisi sudut 30° : 60° : 90°',
          explanation: 'Rasio sisi $= 1 : \\sqrt{3} : 2$.\nSisi samping 30 m (menghadap 30°) $= 1 \\times 30$.\nMaka sisi depan (W) $= 30\\sqrt{3}\\text{ m}$ (Pernyataan 1 Benar). Hipotenusa $= 2 \\times 30 = 60\\text{ m}$ (Pernyataan 2 Benar).'
        },
        {
          title: 'Uji syarat ortogonalitas',
          explanation: 'Trigonometri dasar mutlak butuh siku-siku 90°. Sudut 85° meruntuhkan rumus tangen sederhana (Pernyataan 3 Salah).'
        }
      ],
      conclusion: 'Status: [BENAR, BENAR, SALAH].'
    },
    optionExplanations: [
      { label: 'Pernyataan 1', isCorrect: true, explanation: 'Benar. W = 30 x tan(60°) = 30√3 meter.' },
      { label: 'Pernyataan 2', isCorrect: true, explanation: 'Benar. BP = 30 / cos(60°) = 30 / 0.5 = 60 meter.' },
      { label: 'Pernyataan 3', isCorrect: false, explanation: 'Salah. Jika segitiga tidak siku-siku (85°), rumus tangen biasa runtuh dan wajib menggunakan aturan sinus.' }
    ],
    misconceptions: [
      'Menerapkan rumus tangen pada segitiga yang tidak memiliki sudut siku-siku tanpa koreksi.',
      'Membagi 30 dengan akar 3 alih-alih mengalikannya untuk mencari sisi depan sudut 60 derajat.'
    ],
    keyTakeaway: 'Definisi rasio trigonometri $\\tan = \\frac{y}{x}$ bersandar mutlak pada asumsi segitiga siku-siku ($90^\\circ$). Pada segitiga sembarang, selalu gunakan Aturan Sinus atau Kosinus.',
    narration: {
      introduction: 'Kita berada di soal penutup Elemen Trigonometri, yaitu soal nomor 24 tentang menaksir lebar sungai.',
      stimulus: 'Regu Pramuka mengukur lebar sungai dari garis dasar AB 30 meter yang tegak lurus garis AP, dengan sudut pandang di B sebesar 60 derajat.',
      question: 'Tentukan apakah masing-masing dari ketiga pernyataan evaluasi teknis bernilai Benar atau Salah.',
      options: 'Pernyataan satu menguji lebar sungai 30 akar 3 meter. Pernyataan dua menguji jarak miring BP adalah 60 meter. Pernyataan tiga menguji keabsahan rumus jika sudut patok bukan 90 derajat.',
      preAnswerGuidance: 'Gunakan rasio segitiga istimewa 30-60-90, dan perhatikan bahwa rumus tangen runtuh jika segitiga tidak siku-siku!',
      correctFeedback: 'Sempurna! Urutan penilaian Benar, Benar, Salah sangat tepat. Penalaran trigonometrimu luar biasa kokoh.',
      incorrectFeedback: 'Waspadai syarat segitiga siku-siku: sudut 85 derajat tidak boleh diselesaikan dengan tangen biasa. Mari simak pembahasannya.',
      normalIntroduction: 'Berikut pembuktian matematisnya.',
      normalSteps: [
        { title: 'Lebar Sungai', explanation: 'Tangen 60 derajat adalah akar 3. 30 dikali akar 3 adalah 30 akar 3 meter. Pernyataan 1 Benar.' },
        { title: 'Jarak Miring', explanation: '30 dibagi kosinus 60 derajat atau 30 dibagi setengah adalah 60 meter. Pernyataan 2 Benar.' },
        { title: 'Uji Syarat Siku-Siku', explanation: 'Jika sudutnya 85 derajat, segitiga bukan siku-siku dan wajib memakai Aturan Sinus. Pernyataan 3 Salah.' }
      ],
      normalConclusion: 'Status penilaian: Benar, Benar, Salah.',
      quickIntroduction: 'Gunakan Cara Cepat rasio 1 banding akar 3 banding 2 dari Mister Jo.',
      quickSteps: [
        { title: 'Rasio 30-60-90', explanation: 'Sisi 30 m menghadap 30 derajat. Sisi depan 60 derajat dikali akar 3 jadi 30 akar 3, hipotenusa dikali 2 jadi 60 m!' },
        { title: 'Cek Asumsi', explanation: 'Tangen butuh 90 derajat mutlak. Sudut 85 derajat langsung membatalkan rumus.' }
      ],
      quickConclusion: 'Rasio sudut istimewa menyelesaikan soal dalam sekejap tanpa kalkulator.',
      misconception: 'Banyak peserta lupa bahwa rumus dasar tangen hanya sah untuk segitiga yang memiliki sudut tepat 90 derajat.',
      simplerExplanation: 'Segitiga 30-60-90 adalah separuh dari segitiga sama sisi. Sisi miringnya dua kali lipat sisi terpendek yaitu 60 meter, dan sisi tegaknya adalah 30 dikali akar 3 meter!',
      nextQuestion: 'Luar biasa! Empat elemen utama telah berhasil kamu taklukkan. Sekarang kita masuki elemen penentu terakhir: Data dan Peluang di soal nomor 25!'
    }
  }
];
