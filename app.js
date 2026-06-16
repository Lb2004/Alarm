let alarmTime=null;
let alarmInterval=null;

const alarmInput=document.getElementById('alarmTime')
const setBtn=document.getElementById('setBtn')
const stopBtn=document.getElementById('stopBtn')
const status=document.getElementById('status')
// const container=document.querySelector('.container')
const alarmSound= new Audio('alarmtone.mp4')
alarmSound.loop = true;
setBtn.addEventListener('click',() => {
    if (!alarmInput.value){
        status.textContent='Please select a time';
        return;
    }

    alarmTime=alarmInput.value
    status.textContent=`Alarm set for ${alarmTime}`;
    setBtn.disabled=true;
    stopBtn.disabled=false;

    alarmInterval=setInterval(() => {
        const now=new Date();
        const hours=String(now.getHours()).padStart(2,'0');
        const minutes =String(now.getMinutes()).padStart(2,'0');
        const currentTime= `${hours}:${minutes}`;

        if (currentTime===alarmTime){
            triggerAlarm();
        }

    },1000);
});

stopBtn.addEventListener('click',() => {
    clearInterval(alarmInterval);
    alarmSound.pause()
    alarmSound.currentTime=0;
    alarmTime=null;
    status.textContent='Alarm stopped';
    setBtn.disabled=false;
    stopBtn.disabled=true;
    document.body.classList.remove('alarmfiring')
});

function triggerAlarm(){
    clearInterval(alarmInterval);
    status.textContent='Alarm firing!';
    alarmSound.play()
    document.body.classList.add('alarmfiring')
}
