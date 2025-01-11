$(document).ready(function () {
    $('#openButton').click(function () {
        $('#overlay').fadeOut(500, function () {
            $('#mainContent').fadeIn(500);
            $('.footer').fadeIn(500);
            $('body').css('overflow-y', 'auto');
        });
        
        iniciarPagina();
    });
});

function iniciarPagina() {
    player();
    atualizarTimeline();
    atualizarContador(); // Chama a função para exibir o contador assim que a página carrega
    gerarFrasesAleatorias();
    setInterval(createHeart, 1000);
    setInterval(gerarFrasesAleatorias, 7000);
    setInterval(atualizarContador, 1000); // Atualiza a cada segundo
}

$(".image").click(function () {
    var src = $(this).attr("src");  // Pega o src da imagem clicada
    $("#modalImage").attr("src", src);  // Define o src da imagem do modal
    $("#imageModal").fadeIn();  // Exibe o modal
    $("#modalBackground").fadeIn();  // Exibe o fundo
});

// Fechar o modal ao clicar no fundo
$("#modalBackground").click(function () {
    $("#imageModal").fadeOut();  // Esconde o modal
    $(this).fadeOut();  // Esconde o fundo
});


function player() {
    const audio = document.getElementById('background-music');
    //const seekBar = document.getElementById('seek-bar');  // Se for usar seekBar, mantenha, senão remova

    // Definir a música para tocar em loop
    audio.loop = true;

    // Iniciar a música assim que a página carregar
    audio.play();

    /*/ Atualiza o seek bar enquanto a música toca (se utilizado)
    if (seekBar) {
        audio.addEventListener('timeupdate', function () {
            seekBar.value = (audio.currentTime / audio.duration) * 100;
        });

        // Permite que o usuário avance/retroceda a música
        seekBar.addEventListener('input', function () {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
        });
    }*/
}

function atualizarTimeline() {
    let largura = 0;
    setInterval(() => {
        largura += 1;
        if (largura > 100) largura = 0; // Reinicia quando chegar a 100%
        $('#timeline-bar').css('width', `${largura}%`);
    }, 100);
}

function createHeart() {
    const heart = $('<div class="heart"></div>');
    const x = Math.random() * $(window).width();
    heart.css({ left: x });
    $('body').append(heart);
   
    setTimeout(() => heart.remove(), 5000);
}

function gerarFrasesAleatorias() {
    const phrases = [
        "Amor, cada segundo ao seu lado torna minha vida mais especial. <br>Obrigado por cada sorriso, cada abraço e cada momento que vivemos juntos. 💖😊",
        "Obrigado por ser o motivo dos meus sorrisos, o calor dos meus abraços e a paz que encontro em cada momento. 🌟❤️",
        "Nosso amor é o meu maior presente, e o tempo só fortalece o que sinto por você. 🎁💑",
        "Não importa quanto tempo passe, ao seu lado eu sempre sinto que estou vivendo o melhor dia da minha vida. 💫💏",
        "Entre todos os sonhos que já tive, você é o único que quero viver para sempre. 💕✨",
        "Com você, aprendi que o amor não se mede pelo tempo, mas pela intensidade dos momentos vividos. ⏳💘",
        "Ao seu lado, descobri que a felicidade não está nas grandes coisas, mas nos pequenos momentos que dividimos. 🌸🌺",
        "Cada instante com você é uma lembrança que guardo no coração, e cada segundo longe é uma contagem para te ver novamente. 🕰️💖",
        "Anseio por todos os dias ao seu lado, compartilhando nossos sonhos e construindo uma vida juntos. 💫💑",
        "O pensamento de um futuro casados me aquece o coração e me dá forças para seguir em frente. ❤️💍",
        "Sei que juntos, poderemos superar qualquer desafio que a vida nos traga, e nossa união será a base de tudo. 💪🌟",
        "Cada passo que damos, é mais um passo em direção a uma vida cheia de amor, alegria e companheirismo. 🥰👣",
        "Quero construir com você um lar repleto de paz, carinho e momentos inesquecíveis. 🏡💖",
        "O nosso amor é o alicerce de uma vida que será feita de muitos momentos felizes, conquistas e superações. 🏆🌹",
        "Estou contando os dias para vivermos juntos cada momento do casamento, criando memórias que durarão para sempre. ⏳💍",
        "Nosso casamento será o início de uma jornada maravilhosa, cheia de novos capítulos e histórias para contar. 📖❤️",
        "Eu sonho com o dia em que nos tornaremos marido e mulher, começando a escrever nossa história para sempre. 🌟💍",
        "A cada dia que passa, me sinto mais grato(a) por ter você ao meu lado, e mal posso esperar para sermos casados e vivermos juntos a eternidade. 🙏💞"
    ];
    
    

    // Selecionar uma frase aleatória
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex];

    // Exibir a frase no elemento com id "random-phrase"
    //$('#random-phrase').text(randomPhrase)
    document.getElementById('random-phrase').innerHTML = randomPhrase;
}

function atualizarContador() {
    const startDate = new Date('2022-06-07T00:00:00'); // Data de início
    const now = new Date(); // Data atual

    // Calcular a diferença em anos, meses e dias
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // Ajustar se o mês atual for anterior ao mês de início
    if (months < 0) {
        years--;
        months += 12;
    }

    // Ajustar se o dia atual for anterior ao dia de início
    if (days < 0) {
        months--;
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastMonthDate;
    }

    // Calcular horas, minutos e segundos restantes
    const diff = now - startDate;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Atualizar os elementos com id "years", "months", "days", etc.
    $('#years').text(years.toString().padStart(2, '0') + ' :');
    $('#months').text(months.toString().padStart(2, '0') + ' :');
    $('#days').text(days.toString().padStart(2, '0'));
    $('#hours').text(': ' + hours.toString().padStart(2, '0'));
    $('#minutes').text(': ' + minutes.toString().padStart(2, '0'));
    $('#seconds').text(': ' + seconds.toString().padStart(2, '0'));

    // Formatar o contador para adicionar ":" entre os valores
    $('#counter').text(`${years.toString().padStart(2, '0')} : ${months.toString().padStart(2, '0')} : ${days.toString().padStart(2, '0')} : ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);
}