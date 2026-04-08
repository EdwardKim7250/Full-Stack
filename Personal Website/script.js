const greetingEl = document.getElementById('greeting');
const hour = new Date().getHours();
let greeting = "Hello!";

if(hour < 12){
  greeting = "Good morning!";
} else if(hour < 18){
  greeting = "Good afternoon!";
} else {
  greeting = "Good evening!";
}

greetingEl.textContent = `${greeting} Welcome to my personal website.`;