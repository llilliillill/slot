/* [ ВСЕ ИКОНКИ ] */
let icon = ["img/0.png","img/1.png","img/2.png","img/3.png","img/4.png"];
let score = 0;
let button = true;
let animat = true;

/* [ SCREEN ] */
let a = ''+
'<img class="icon" src="img/4.png" index="4">'+
'<img class="icon" src="img/1.png" index="1">'+
'<img class="icon" src="img/2.png" index="2">';

let b = ''+
'<img class="icon" src="img/3.png" index="3">'+
'<img class="icon" src="img/0.png" index="0">'+
'<img class="icon" src="img/1.png" index="1">';

let c = ''+
'<img class="icon" src="img/0.png" index="0">'+
'<img class="icon" src="img/4.png" index="4">'+
'<img class="icon" src="img/2.png" index="2">';

let d = ''+
'<img class="icon" src="img/3.png" index="3">'+
'<img class="icon" src="img/0.png" index="0">'+
'<img class="icon" src="img/4.png" index="4">';

document.getElementsByClassName('line')[0].innerHTML = a;
document.getElementsByClassName('line')[1].innerHTML = b;
document.getElementsByClassName('line')[2].innerHTML = c;
document.getElementsByClassName('line')[3].innerHTML = d;

/* [ SHINE ] */
function shine(x){
    document.querySelector('[id="score"]>div:nth-child(1)').innerHTML = score+'₽ '+x;
    document.querySelector('[id="score"]>div:nth-child(1)').setAttribute('class', 'shine');
    setTimeout(()=>{ 
        document.querySelector('[id="score"]>div:nth-child(1)').removeAttribute('class'); 
        document.querySelector('[id="score"]>div:nth-child(1)').innerHTML = score+'₽';
    }, 3500);
}

/* [ MENU ] */
document.querySelector('[id="score"]>div:nth-child(2)').onclick = function(){
    document.querySelector('#block').style.display = 'block';
}
document.querySelector('[id="header"]>div:nth-child(2)').onclick = function(){
    document.querySelector('#block').style.display = 'none';
}

/* [ BUTTONS ] */
document.getElementById('pay').onclick = function(){
    if(score<50){
        
        /* [ ... ] */
        if(button){
            document.getElementById('start').style.color = 'red';
            document.getElementById('start').style.border = '1px solid red';
        } else {
            document.getElementById('start').style.border = '1px solid red';
            document.getElementById('start').style.color = 'red';
        }
        document.getElementById('pay').style.color = 'black';
        document.getElementById('pay').style.border = '1px solid black';

        score += 1000;
        new Audio('img/cassa.mp3').play();
        shine('<b style="color:rgb(97, 192, 97);">+1000₽</b>');
    }
}

/* [ RANDOM ] */
function random(){
    return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
}

/* [ ВРАЩЕНИЕ ВСЕХ БАРАБАНОВ ] */
let interval = [];
let n = 4;
let t = 30;
let h = random();

document.getElementById('start').onclick = function(){

    /* [ ПОБЕДА ДЕАКТИВАЦИЯ ] */
    document.querySelector('[class="line"]:nth-child(1)>[class="icon"]:nth-child(2)').style.border = '';
    document.querySelector('[class="line"]:nth-child(2)>[class="icon"]:nth-child(2)').style.border = '';
    document.querySelector('[class="line"]:nth-child(3)>[class="icon"]:nth-child(2)').style.border = '';
    document.querySelector('[class="line"]:nth-child(4)>[class="icon"]:nth-child(2)').style.border = ''; 

    /* [ ЗАПУСТИТЬ ВРАЩЕНИЕ ] */
    if(button && animat){

        /* [ ... ] */
        if((score-100)<=0){
            document.getElementById('pay').style.border = '1px solid green';
            document.getElementById('pay').style.color = 'green';
        }

        /* [ ... ] */
        if(score>=50){
        score -= 50;
        document.querySelector('[id="score"]>div:nth-child(1)').innerHTML = score+'₽';

        /* [ ... ] */
        button = false;

        /* [ ... ] */
        document.getElementById('stop').style.border = '1px solid blue';
        document.getElementById('stop').style.color = 'blue';
        document.getElementById('start').style.border = '1px solid black';
        document.getElementById('start').style.color = 'black';
    
        for(let i=0; i<4; i++){
            interval[i] = setInterval(() =>{   
                
                /* [ ... ] */
                if(score>5000){ 
                    icon[4] = 'img/5.png';
                } else { 
                    icon[4] = 'img/4.png'; 
                }

                let rand = random();
                let img = document.createElement('img');

                if(n>0){
                    img.src = icon[h];
                    img.setAttribute('class', 'icon');
                    img.setAttribute('index', h);
                    n--;
                } else {
                    img.src = icon[rand];
                    img.setAttribute('class', 'icon');
                    img.setAttribute('index', rand);
                }

                if(t<0){ h = random(); n = 4; t = 30; } t--; 

                document.querySelectorAll('[class="line"]')[i].append(img);
                document.querySelectorAll('[class="icon"]:nth-child(1)')[i].remove();
                

            }, 200);
        }

        /* [ ОСТАНОВИТЬ ВРАЩЕНИЕ ] */
        document.getElementById('stop').onclick = function(){
            if(!button){

            clearInterval(interval[0]);
            clearInterval(interval[1]);
            clearInterval(interval[2]);
            clearInterval(interval[3]);

            let index = [];
            index[0] = document.querySelectorAll('[class="icon"]:nth-child(2)')[0].getAttribute('index');
            index[1] = document.querySelectorAll('[class="icon"]:nth-child(2)')[1].getAttribute('index');
            index[2] = document.querySelectorAll('[class="icon"]:nth-child(2)')[2].getAttribute('index');
            index[3] = document.querySelectorAll('[class="icon"]:nth-child(2)')[3].getAttribute('index');
            
            if(index[0] == index[1] && index[1] == index[2] && index[2] == index[3]){
          
                animat = false;

                for(let i=0; i<4; i++){
                    document.querySelectorAll('[class="line"]>[class="icon"]:nth-child(2)')[i].setAttribute('victory', '');
                    document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].style.borderTop = '2px solid rgb(45, 45, 146)';
                    document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].style.borderBottom = '2px solid rgb(45, 45, 146)';
                    document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].src = 'img/boom.gif';
                }

                new Audio('img/boom.mp3').play();

                setTimeout(() =>{
                    for(let i=0; i<4; i++){
                        document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].src = 'img/6.png';
                        document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].style.borderTop = '';
                        document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].style.borderBottom = '';
                        document.querySelectorAll('[class="icon"]:nth-child(2), [victory]')[i].removeAttribute('victory');
                    }
                    new Audio('img/cassa.mp3').play();
                    animat = true;
                }, 1800);
            
                switch(index[0]){
                    case '0':
                        score += 500; 
                        shine('<b style="color:rgb(97, 192, 97);">+500₽</b>');
                        break;
                    case '1':
                        score += 500; 
                        shine('<b style="color:rgb(97, 192, 97);">+500₽</b>');
                        break;
                    case '2':
                        score += 500; 
                        shine('<b style="color:rgb(97, 192, 97);">+500₽</b>');
                        break;
                    case '3':
                        score *= 2; 
                        shine('<b style="color:rgb(97, 192, 97);">x 2 ');
                        break;
                    case '4':
                        if(score>5000){
                            score -= 3000; 
                            shine('<b style="color:red;">-3000₽</b>');
                        } else {
                            score += 2000; 
                            shine('<b style="color:rgb(97, 192, 97);">+2000₽</b>');
                        }
                    break;
                }

            } else {
                let x = 0;
                for(let i=0; i<4; i++){
                    if(index[i] == 4){
                        animat = false;
                        if(score>5000){
                            document.querySelectorAll('[class="line"]>[class="icon"]:nth-child(2)')[i].setAttribute('star', '');
                            document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].style.border = '1px solid red';
                            document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].src = 'img/boom.gif';

                            x += 150; 
                            
                            setTimeout(() =>{
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].style.border = '';
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].src = 'img/6.png';
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].removeAttribute('star');
                                animat = true;
                            }, 1800);

                            new Audio('img/minus.mp3').play();
                            score -= x;
                            shine('<b style="color:red;">-'+x+'₽</b>');
                        } else {
                            document.querySelectorAll('[class="line"]>[class="icon"]:nth-child(2)')[i].setAttribute('star', '');
                            document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].style.border = '1px solid green';
                            document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].src = 'img/boom.gif';

                            x +=25; 
                            
                            setTimeout(() =>{
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].style.border = '';
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].src = 'img/6.png';
                                document.querySelectorAll('[class="icon"]:nth-child(2), [star]')[i].removeAttribute('star'); 
                                animat = true;       
                            }, 1800);

                            new Audio('img/star.mp3').play();
                            score += x;
                            shine('<b style="color:green;">+'+x+'₽</b>');
                        }
                        
                    }
                }
                            
            } //else 
           
            } //if
            
            /* [ ... ] */
            button = true;
            document.getElementById('start').style.border = '1px solid red';
            document.getElementById('start').style.color = 'red';
            document.getElementById('stop').style.border = '1px solid black';
            document.getElementById('stop').style.color = 'black';
            
        } // function

    } //if
    } //if

}






