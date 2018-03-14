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


* <strong>Using NPM hamburgers - with Angular Bootstrap-MD<strong> <br>
-Hamburgers is a collection of tasty CSS-animated hamburger icons. Also included is the source as a Sass library. It’s modular and customizable, so cook up your own hamburger.
-Detailed installation can be found in NPM website: <i>simply used the CSS file provided</i>, set it in the global `styles.scss` file in my project. Then used the appropriate `hamburger-type` class in the html of desired component : Link to doc - [https://www.npmjs.com/package/hamburgers
](https://www.npmjs.com/package/hamburgers) <br>


<small>* Note  to have hamburbers work with Angular Bootstrap-MD:* Start by Taking off the `^` away symbol from your `angular-bootstrap-md` dependency your the `package.json` file:</small> <br>

 ```
 "dependencies": {
    "angular-bootstrap-md": "^5.2.2", <========== should not have the ^ Take it OFF 
  }
 ```

<br>
Steps taken to have it work with Angular Bootstrap MD `<mdb-navbar` component <br>
1. set CSS Hamburger Styles in `styles.scss` <br> 
2. Locate your `node_modules --> angular-bootstrap-md` directory and copy it to your `src` directory, because you'll have to make changes.
*it is essential to do the above because when your `node_modules` is built with nmp they will be overwritten, specially when deploying*
*You can take an extra step and just take out what you need, but I found it easier and less time consuming to just copy the whole `angular-boostrap-md`directory, then just modify what is needed* <br>
3. Add the correct path to your imports in `app.module.ts` file, that is.. 

```
import { MDBBootstrapModule } from '../angular-bootstrap-md'; <===== ADD THIS LINE

```

4. inside angular-bootstrap-mds file `navbar.component.ts` : set variable `public isactive = false` inside the `NavbarComponent` export, should have something that looks like this..<br>

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

5. Then inside angular-bootstrap-mds `navbar.component.html` add the code that can be found in the NPM hamburgers docs, You can follow the NPM Docs as this is the simple html file. I added the full code of my funtional `hamburger Button` here. what is before and after the dots is all that was altered form the orginal boostrap navbar compoment. <br>

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
*Then just modify your hamburger in `styles.scss` to have it look have the look you want to achive, but the above takes care of the animation* <br>

* <strong>Angular Google Maps (@AGM/Core)</strong> <br>
-Angular 2+ components for Google Maps. Link for installation and docs: - [https://angular-maps.com/api-docs/agm-core/index.html
](https://angular-maps.com/api-docs/agm-core/index.html) <br>



---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.


## NODE.js Server & Express: 

Added Node.js `server.js` to run the app. This is so that the contact forms email server could be set up with the form. 

-Nice detailed explaination on adding a node.js server to the angular2 app can be found in this repo. [https://github.com/gangachris/ng2-mean](https://github.com/gangachris/ng2-mean). This just sets the framework for a Full stack functionality. It doesnt include Nodemailer installation.

-As Well As Here:[https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli](https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli) <br>



## Node.js Dependencies Used

* <strong>express</strong> <br>
* <strong>body-parser</strong> <br>
* <strong>express-handlebars</strong> <br>

* <strong>Nodemailer</strong> <br>
-This is used for the contact form to send the users message with their email.
-nodemailer installation guide and docs can be found at their website: link - [https://nodemailer.com/about/](https://nodemailer.com/about/)<br>



