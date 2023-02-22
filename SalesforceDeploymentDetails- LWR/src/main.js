import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import App from 'sf/deploymentstatus';

const elm = createElement('sf-deploymentstatus', { is: App });
document.body.appendChild(elm);