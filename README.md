# PortfolioSite

---

## Author Jose Ramirez:

---

## Additional Dependencies Added:

* <strong>Angular Bootstrap With Material Design</strong> <br>
-Detailed set up with Angular Material Design MD can Be found at NPM website: Link - [https://www.npmjs.com/package/angular-bootstrap-md
](https://www.npmjs.com/package/angular-bootstrap-md) <br>

* <strong>wow.js for animations</strong> <br>
-added following import to the `index.html` file animations to fire when scrolling.<br>
-This is added in the header of indeex.hmtl <br> 
`<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>`
-This is added before the closing `</body>` tag inside your `index.html` file after the AngularBootstrap MD above has been properly.<br>
```
<script>
    new WOW().init();
</script>
``` 
<small>(as of 03/05/18 Hopefully this is fixed later)</small>

* <strong>ng2-smooth-scroll</strong> <br>
-A pure-javascript library and set of directives to scroll smoothly to an element with easing. This can be done component to component to build a very smooth feel when navigating to elements on the same page.
-Detailed set up with for angular project and documentation can be found at NPM website: Link - [https://www.npmjs.com/package/ng2-smooth-scroll
](https://www.npmjs.com/package/ng2-smooth-scroll) <br>


* <strong>*Using NPM hamburgers - with Angular Bootstrap-MD*<strong> <br>

-Hamburgers is a collection of tasty CSS-animated hamburger icons. Also included is the source as a Sass library. It’s modular and customizable, so cook up your own hamburger.
-Detailed installation can be found in NPM website: I simply used the CSS file provided, set it in the global `styles.scss` file in my project. Then used the appropriate `hamburger-type` class in the html of desired component : Link to doc - [https://www.npmjs.com/package/hamburgers
](https://www.npmjs.com/package/hamburgers) <br>

<small>*Note to have hamburbers work with Angular Bootstrap-MD and not be overwritten with updates, Take the `^` away symbol from your `angular-bootstrap-md` dependency your the `package.json` file:<small> <br> 
 ```
 "dependencies": {
    "angular-bootstrap-md": "^5.2.2", <========== should not have the ^ Take it OFF 
  }
 ```
<br>
Steps taken to have it work with Angular Bootstrap MD `<mdb-navbar` component <br>
1. set CSS Hamburger Styles in `styles.scss` <br> 
2. Locate your `node_modules --> angular-bootstrap-md --> navbars` directory
3. inside file`navbar.component.ts` : set variable `public isactive = false` inside your `NavbarComponent` export, should have something that looks like this..<br>
```
 .
 .
 . 
  export class NavbarComponent implements AfterViewInit, OnInit {
 .
 .
  public isactive = false; // <========== HERE IS WHAT YOU WANT TO ADD
 .
 .  
```
- Then in that same file `navbar.component.ts`, locate the `show()` and `hide()` functions: inside `show()` add `this.acitve = true` and inside `hide()` add `this.isactive = false`, and inside your `@HostListener()` : like this..<br>

```
show() {
    this.shown = true;
    this.collapse = false;
    this.collapsing = true;
    this.isactive = true; // <========== HERE IS WHAT YOU WANT TO ADD
    setTimeout(() => {
      this.renderer.setElementStyle(this.el.nativeElement, 'height', this.height + 'px');   
    }, 10);

```

and in hide(), like this .. <br>
```
hide() {
    this.shown = false;
    this.collapse = false;
    this.showClass = false;
    this.collapsing = true;
    this.isactive = false; //<========== HERE IS WHAT YOU WANT TO ADD
    setTimeout(() => {
      this.renderer.setElementStyle(this.el.nativeElement, 'height', '0px');
    }, 10);

```
and in `@HostListener()`, like this..<br>
```
@HostListener('window:resize', ['$event']) onResize(event: any) { //start bracket
   .
   .
   .
   .
   .
          this.collapse = true;
          this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '');
        }, 4);
      }
    } else {
      this.collapsing = false;
      this.shown = false;
      this.showClass = false;
      this.collapse = true;
      this.isactive = false;//<========== HERE IS WHAT YOU WANT TO ADD
      this.renderer.setElementStyle(this.el.nativeElement, 'height', '');
    }
  } //end bracket
```
<br> 

Done with `navbar.component.ts` , Save & Close the file. 

<br>

4. Then inside your `navbar.component.html` add the code that can be found in the NPM hamburgers docs, You can follow the NPM Docs as this is the simple html file. I added the full code of my funtional `hamburger Button` here. what is before and after the dots is all that was altered form the orginal boostrap navbar compoment. <br>
```
<nav class="{{SideClass}}" #nav>
  <div [ngClass]="{'container': containerInside}" [ngStyle]="{'display': displayStyle}" #container>
    <ng-content select="logo"></ng-content>
    <ng-content *ngIf="this.doubleNav == true" select="navlinks"></ng-content>
    <div *ngIf="this.doubleNav == false">
    .
    .
    .
    .
      <!-- class below did not have:  hamburger  hamburger--collapse , also added the following code [ngClass]="{'is-active': isactive}"-->
      <button class="navbar-toggler hamburger hamburger--collapse" [ngClass]="{'is-active': isactive}" type="button" (click)="toggle($event)" mdbRippleRadius *ngIf="this.el.nativeElement.children.length !== 0">
        <!-- span below had navbar-toggle-icon originialy , CHANGE IT TO hamburger-box-->
        <span class="hamburger-box ">
          <!-- add this span for the hamburger-inner class -->
           <span class="hamburger-inner"></span>
        </span>
      </button>
      .
      .
      .
      .
    </div>
    <div #navbar [style.height]="height" class="navbar-collapse collapse" [ngClass]="{'collapse': collapse, 'show': showClass, 'collapsing': collapsing}">
      <ng-content select="links"></ng-content>
    </div>
  </div>
</nav> 

```
*Switch the `hamburger--collapse` to your desired class found in NPM docs* <br>
*Then just modify your `styles.css` to have it look have the look you want to achive, but the above takes care of the animation*



---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

