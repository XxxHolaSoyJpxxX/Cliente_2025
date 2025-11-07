import { Highlight } from './highlight';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Highlights', () => {
  it('should create an instance', () => {
    const elRef = new ElementRef(document.createElement('div'));
    const renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);
    const directive = new Highlight(elRef, renderer);
    expect(directive).toBeTruthy();
  });
});
