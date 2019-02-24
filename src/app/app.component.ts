import { Component, Renderer2, ViewContainerRef, ComponentFactoryResolver,
  ViewChild, Output, ViewChildren, EventEmitter, QueryList, AfterViewInit, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpandedSectionComponent } from './expanded-section/expanded-section.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  userLists: any;
  isLoaded: Boolean;
  public selectedOpt: string;
  public openSection: Array<boolean> = [];
  sort: Array<string> = [];
  componentData: any;
  public expandDetails: boolean;
  @Output() sendData = new EventEmitter();

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;

  constructor(
    private http: HttpClient,
    private resolver: ComponentFactoryResolver,
  ) { }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.isLoaded = true;
    this.sort = ['name', 'city'];
  }

  ngAfterViewInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(
        data => {
          this.userLists = data;
          console.log(this.userLists);
          this.isLoaded = false;
        },
        err => {
          console.log('Error', err);
        }
      );
  }

  // ViewContainerRef — create templates or components dynamically
  public openComponent(index) {
    console.log(this.entry);
    const myFactory = this.resolver.resolveComponentFactory(ExpandedSectionComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['data'] = this.userLists[index];
      myRef.changeDetectorRef.detectChanges();
    }
  }

  public closeComponent(index) {
    this.entry[index].ViewContainerRef.remove();
  }

  public expandSection(index, evt) {
    this.expandDetails = !this.expandDetails;
    // const expandElement = evt.target.parentElement.querySelector('card-body');
    const expandElement = evt.target.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body');
    console.log(expandElement);
    if (!evt.target.classList.contains('open')) {
      expandElement.classList.remove('hide-section');
      evt.target.classList.add('open');
      this.openComponent(index);
    } else {
      expandElement.classList.add('hide-section');
      evt.target.classList.remove('open');
      this.closeComponent(index);
    }
  }

  public chnageFilter(event) {
    this.selectedOpt = event.target.value;
    // sessionStorage.setItem('optChoose', this.selectedOpt);
    // convert object into array
    this.selectedOpt = this.selectedOpt.toLowerCase();
    console.log(this.selectedOpt);
    const SortByName = (x, y) => {
      if (this.selectedOpt === 'city') {
        return ((x.address[this.selectedOpt] === y.address[this.selectedOpt]) ? 0 :
          ((x.address[this.selectedOpt] > y.address[this.selectedOpt]) ? 1 : -1));
      } else {
        return ((x[this.selectedOpt] === y[this.selectedOpt]) ? 0 : ((x[this.selectedOpt] > y[this.selectedOpt]) ? 1 : -1));
      }
    };
    this.userLists.sort(SortByName);
  }

}
