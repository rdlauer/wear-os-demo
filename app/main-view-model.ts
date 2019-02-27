import { ItemEventData } from 'nativescript-wear-os/packages/listview';
import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Frame, topmost } from 'tns-core-modules/ui/frame';

export class HelloWorldModel extends Observable {
  public items = new ObservableArray([
    <any>{
      title: 'Check Claims',
      image: '~/images/question.png'
    },
    {
      title: 'Contact Us',
      image: '~/images/mail.png'
    },
    {
      title: 'Pay Bill',
      image: '~/images/dollar.png'
    }
  ]);

  constructor() {
    super();
    this.set('items', this.items);
  }

  onItemTap(args: ItemEventData) {
    const x = this.items.getItem(args.index);
    const frame = topmost().currentPage.frame as Frame;

    console.log('tapped item', x);

    if (args.index === 0) {
      //frame.navigate('./wear-os-layout-page/wear-os-layout-page');
      frame.navigate('./box-inset-page2/box-inset-page2');
    } else if (args.index === 1) {
      //frame.navigate('./box-inset-page/box-inset-page');
    } else if (args.index === 2) {
	  //frame.navigate('./circular-progress-page/circular-progress-page');
	  frame.navigate('./box-inset-page3/box-inset-page3');
    }
  }
}
