/**
 * bankomat
 * autor Stanisław Solarz
 */
//varaibles
let screen = document.getElementById('screen');
    error = document.getElementById('error');
    step = 4;
    buffer = [];
    money = 10000;
    pass = 1234;
    ile100 = 0;
    ile50 = 0;
    ile20 = 0;
    ile10 = 0;
    doWyplaty = 0;

let pinMsg = "podaj swoj pin: ";
    getMsg = "podaj kwote do wyplaty: ";
    menu = "Witaj wybierz opcje: <br> 1.sprawdz balans <br> 2.wyplac pieniadze <br> 3.wyloguj";


function start() {
    step = 10;
    screen.innerHTML = "Aby uzyc bankomatu wcisnij enter";
    error.innerHTML = "";
    step = 0;
}

start()


function login(value) {
    if((value != "enter") && (value != "C")) {
        buffer.push(value);
        screen.innerHTML = pinMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
        error.innerHTML = "";
    } else if(value == "enter") {
        if(buffer.length != 4) {
            error.innerHTML = 'twoj pin jest za dlugi lub za krotki';
            buffer.length = 0;
            screen.innerHTML = pinMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
        } else {
            if(buffer.join("") == pass) {
                error.innerHTML = "";
                buffer.length = 0;
                screen.innerHTML = menu;
                step++;
            } else {
                buffer.length = 0;
                error.innerHTML = 'podales zle haslo';
                screen.innerHTML = pinMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
            }
        }
    } else if(value == "C") {
        buffer = [];
        screen.innerHTML = pinMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
        error.innerHTML = "";
    }
}

function select(value) {
    if(step == 1) {
        screen.innerHTML = menu;
        if((value != "enter") && (value != "C")) {
            buffer.push(value);
            screen.innerHTML = "Witaj wybierz opcje: <span style='color: red;'>" + value +"</span><br> 1.sprawdz balans <br> 2.wyplac pieniadze <br> 3.wyloguj";
            error.innerHTML = "";
        } else if(value == "enter") {
            error.innerHTML = "";
            if(buffer.join("") == 3) {
                logout();
            } 

            else if (buffer.join("") == 2) {
                step = 6;
                screen.innerHTML = getMsg;
                buffer = [];
            }

            else if (buffer.join("") == 1) {
                
                ballance();

            } else {
                buffer = [];
                screen.innerHTML = menu
                error.innerHTML = "nie ma takiej opcji";
            }
        } else if(value == "C") {
            buffer = [];
            screen.innerHTML = menu
            error.innerHTML = "";
        }
    }
}

function getData(value) {
    screen.innerHTML = getMsg;
    error.innerHTML = "";
    if((value != "enter") && (value != "C")) {
        buffer.push(value);
        screen.innerHTML = getMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
    } else if(value == "enter") {
        payout(buffer.join(""));
    } else if(value == "C") {
        buffer = [];
        screen.innerHTML = getMsg + "<span style='color: red;'>" + buffer.join("") + "</span>";
    }
}

function payout(doWyplaty) {
    let temp = doWyplaty;
        ile100 = 0;
        ile50 = 0;
        ile20 = 0;
        ile10 = 0;

    if((money <= 0) || (doWyplaty > money)) {

        error.innerHTML = "nie masz pjeniedzy";
        buffer = [];
    
    } else {
    
        //czy kwato wyplaty jest wyplacalna nie np 15 mus byc 20 lub czy nie przekracza 20000
        if((doWyplaty % 10) || (doWyplaty == 0) || (doWyplaty > 20000)) {
    
            error.innerHTML = "nie da sie tego wyplacic";
            buffer = [];
    
        } else {
            
            //wyplacenie nominalow i like 100/50/20/10
            while(doWyplaty >= 100 && doWyplaty > 0)  {
                doWyplaty -= 100;
                ile100++;
            }
            while(doWyplaty >= 50 && doWyplaty > 0)  {
                doWyplaty -= 50
                ile50++;
            }
            while(doWyplaty >= 20 && doWyplaty > 0)  {
                doWyplaty -= 20;
                ile20++;
            }
            while(doWyplaty >= 10 && doWyplaty > 0)  {
                doWyplaty -= 10;
                ile10++;
            }
            console.log(doWyplaty);
            if(doWyplaty == 0) {
                if((ile100 + ile50 + ile20 + ile10) > 20) {
                    error.innerHTML = "za duzo banknotow";
                    buffer = [];
                } else {
                    // console.log("twoja kwota do wyplaty: " + temp);
                    // console.log("100 x " + ile100);
                    // console.log("50 x " + ile50);
                    // console.log("20 x " + ile20);
                    // console.log("10 x " + ile10);
                    screen.innerHTML = "twoja kwota do wypłaty: <span style='color: red;'>" + temp + " zł</span><br>" +
                                       "100 zł x " + ile100 + "<br>" + 
                                       "50 zł x " + ile50 + "<br>" + 
                                       "20 zł x " + ile20 + "<br>" + 
                                       "10 zł x " + ile10 + "<br>wcisnij enter aby wrocic do menu";
                    step = 5;
                    buffer = [];
                    //if sprawdzajacy czy wplaca czy wyplaca pieniadze
                    money = money - temp;
                }
            }
        }
    }
}

function logout() {
    step = 0;
    buffer = [];
    screen.innerHTML = pinMsg;
}

function ballance() {
    step = 5;
    screen.innerHTML = "stan twojego konta to: <span style='color: red;'>" + money + "zł</span><br> wcisnij enter aby wrocic do menu"
}

function back(value) {
    if(value == "enter") {
        step = 1;
        buffer = [];
        screen.innerHTML = menu;
    }
}

//chek for press
document.getElementById("enter").onclick = function() {
    screen.innerHTML = pinMsg;
    document.querySelectorAll('#numpad input').forEach(function(button) {
        button.onclick = function() {
            let value = this.id;
            //startup
            if (step == 10) {
                start();
            }
            //login
            else if(step == 0) {
                login(value);
            }
            //kazdy step inna opcaj wyplacanie wplacanie konto status dadaj na lekcji powrot do menu
            else if(step == 1) {
                select(value);
            }
            //logout
            else if(step == 4) {
                logout();
            } 
            //powrot do menu
            else if(step == 5) {
                back(value);
            }
            //pobierz z numpad do wyplaty
            else if(step == 6) {
                getData(value);
            }
            //default
            else {
                //alert('bład step:' + step + "value: " + value);
                alert('bład');
            }
        };
    });
}