import en from './en.js';
import ru from './ru.js';

let lang = en;
let register = 'small';

const renderBtn = () => {
  keys.forEach((el) => {
    const btn = lang.find((btn) => btn.code === el.dataset.code);
    el.innerHTML = btn[register];
  });
};

const changeRegister = () => {
  register = register === 'small' ? 'shift' : 'small';
  renderBtn();
};

class KeyboardViewer {
  constructor() {
    this.wrapper = null;
    this.area = null;
    this.board = null;
    this.key = null;
    this.changeLangKeys = null;
  }

  createArea() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    document.body.append(this.wrapper);

    this.area = document.createElement('textarea');
    this.area.classList.add('area');
    this.wrapper.append(this.area);

    this.board = document.createElement('div');
    this.board.classList.add('keyboard-wrapper');
    this.wrapper.append(this.board);
    this.createBoard(lang);

    this.changeLangKeys = document.createElement('p');
    this.changeLangKeys.classList.add('text');
    this.changeLangKeys.innerHTML = 'Use Ctrl + Alt to for changing languages';
    this.wrapper.append(this.changeLangKeys);
  }

  createBoard(obj) {
    for (let i = 0; i < obj.length; i++) {
      this.key = document.createElement('button');
      this.key.classList.add('btn-key');
      this.key.dataset.code = `${lang[i].code}`;
      this.board.append(this.key);
      if (obj[i].code === 'Tab') {
        this.key.style.width = '120px';
      }
      if (obj[i].code === 'Space') {
        this.key.style.width = '435px';
      }
      if (obj[i].code === 'CapsLock') {
        this.key.style.width = '140px';
      }
      if (obj[i].code === 'ShiftLeft') {
        this.key.style.width = '150px';
      }
      if (obj[i].code === 'Backspace') {
        this.key.style.width = '190px';
      }
      if (obj[i].code === 'Enter') {
        this.key.style.width = '180px';
      }
      if (obj[i].code === 'ShiftRight') {
        this.key.style.width = '170px';
      }
      if (obj[i].code === 'ControlLeft') {
        this.key.style.width = '130px';
      }
    }
  }
}

const content = new KeyboardViewer();
content.createArea();

const keys = document.querySelectorAll('.btn-key');

renderBtn();

const text = document.querySelector('.area');

document.addEventListener('click', (event) => {
  const posititonCoursor = text.selectionStart;
  const startCoursor = text.value.slice(0, posititonCoursor);
  const endCoursor = text.value.slice(posititonCoursor);
  const btn = event.target.dataset.code;
  if (!btn) {
    return;
  }
  text.focus();
  switch (btn) {
    case 'CapsLock':
      changeRegister();
      break;
    case 'Space':
      text.value = `${startCoursor} ${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Tab':
      text.value = `${startCoursor}\t${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Enter':
      text.value = `${startCoursor}\n${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Backspace':
      text.value = text.value.slice(0, posititonCoursor - 1) + text.value.slice(posititonCoursor);
      text.setSelectionRange(posititonCoursor - 1, posititonCoursor - 1);
      break;
    case 'Delete':
      text.value = text.value.slice(0, posititonCoursor) + text.value.slice(posititonCoursor + 1);
      text.setSelectionRange(posititonCoursor, posititonCoursor);
      break;
    case 'AltLeft':
    case 'ControlLeft':
    case 'ShiftLeft':
    case 'AltRight':
    case 'ControlRight':
    case 'ShiftRight':
      break;
    default:
      const btnSymbol = lang.find((l) => l.code === btn);
      text.value = `${startCoursor}${btnSymbol[register]}${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      text.focus();
  }
});

window.addEventListener('keyup', (event) => {
  const posititonCoursor = text.selectionStart;
  const startCoursor = text.value.slice(0, posititonCoursor);
  const endCoursor = text.value.slice(posititonCoursor);
  switch (event.code) {
    case 'ControlLeft' && 'AltLeft':
      lang = lang === en ? ru : en;
      renderBtn();
      break;
    case 'ControlRight' && 'AltRight':
      lang = lang === en ? ru : en;
      renderBtn();
      break;
    case 'CapsLock':
      changeRegister();
      break;
    case 'Tab':
      text.value = `${startCoursor}\t${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Enter':
      text.value = `${startCoursor}\n${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Space':
      text.value = `${startCoursor} ${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      break;
    case 'Backspace':
      text.value = text.value.slice(0, posititonCoursor - 1) + text.value.slice(posititonCoursor);
      text.setSelectionRange(posititonCoursor - 1, posititonCoursor - 1);
      break;
    case 'Delete':
      text.value = text.value.slice(0, posititonCoursor) + text.value.slice(posititonCoursor + 1);
      text.setSelectionRange(posititonCoursor, posititonCoursor);
      break;
    case 'AltLeft':
    case 'ControlLeft':
    case 'ShiftLeft':
    case 'AltRight':
    case 'ControlRight':
    case 'ShiftRight':
      break;
    default:
      const btnSymbol = lang.find((l) => l.code === event.code);
      text.value = `${startCoursor}${btnSymbol[register]}${endCoursor}`;
      text.setSelectionRange(posititonCoursor + 1, posititonCoursor + 1);
      text.focus();
  }
});

let flag = 0;

window.addEventListener('keydown', (event) => {
  if (event.code !== 'F12') {
    event.preventDefault();
  }

  if (event.code === 'ShiftLeft' && flag === 0) {
    changeRegister();
    flag++;
  }
  if (event.code === 'ShiftRight' && flag === 0) {
    changeRegister();
    flag++;
  }
});

window.addEventListener('mousedown', (event) => {
  const btn = event.target.dataset.code;

  if (btn === 'ShiftLeft') {
    changeRegister();
  }
  if (btn === 'ShiftRight') {
    changeRegister();
  }
});

window.addEventListener('mouseup', (event) => {
  const btn = event.target.dataset.code;

  if (btn === 'ShiftLeft') {
    changeRegister();
  }
  if (btn === 'ShiftRight') {
    changeRegister();
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft') {
    flag = 0;
    changeRegister();
  }
  if (event.code === 'ShiftRight') {
    flag = 0;
    changeRegister();
  }
});

let pressedBtn;
document.addEventListener('mousedown', (event) => {
  event.target.dataset.code && event.target.classList.add('active');
  pressedBtn = event.target.dataset.code ? event.target : null;
});

document.addEventListener('mouseup', () => {
  pressedBtn && pressedBtn.classList.remove('active');
  pressedBtn = null;
});

document.addEventListener('keydown', (event) => {
  keys.forEach((el) => {
    if (el.dataset.code === event.code) {
      el.classList.add('active');
    }
  });
});
document.addEventListener('keyup', (event) => {
  keys.forEach((el) => {
    if (el.dataset.code === event.code) {
      el.classList.remove('active');
    }
  });
});
