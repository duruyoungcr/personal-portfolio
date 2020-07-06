//typewriter
class Typewriter {
  constructor(textElement, words, wait) {
    this.textElement = textElement;
    this.words = words;
    this.text = "";
    this.wordIndex = 0;
    this.wait = wait;
    this.isDeleting = false;
    this.type();
  }
  //type method
  type() {
    //current index of word
    const index = this.wordIndex % this.words.length;
    //get full text of current word
    const currentWord = this.words[index];
    //deletion check
    if (this.isDeleting) {
      this.text = currentWord.substring(0, this.text.length - 1);
    } else {
      this.text = currentWord.substring(0, this.text.length + 1);
    }
    //insert text into textElement
    this.textElement.innerHTML = `<span class='text'>${this.text}</span>`;

    //initial type speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 1.5;
    }
    //if word is complete
    if (!this.isDeleting && this.text === currentWord) {
      //pause
      typeSpeed = this.wait;
      //then start deleting
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      //move to next word
      this.wordIndex++;
      //pause before resuming
      typeSpeed = this.wait;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
function setup() {
  const textElement = document.querySelector(".typewriter");
  const words = JSON.parse(textElement.dataset.words);
  const wait = JSON.parse(textElement.dataset.wait);
  new Typewriter(textElement, words, wait);
}
document.addEventListener("DOMContentLoaded", setup);
