import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyimage',
  templateUrl: './lazyimage.component.html'
})
export class LazyimageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  ngOnInit(): void {
      if(!this.url) throw new Error('URL property is required');
  }

}
