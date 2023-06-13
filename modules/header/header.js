class StickyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.revealThreshold = this.attributes['hide-threshold'].value || 300; 
    this.headerWrapper = document.getElementById('shopify-section-header');
    this.topbar = document.querySelector('[announcement-bar]');
    this.header = document.querySelector('[header]');

    this.headerWrapper.style.position = "sticky";
    this.topbar.style.position = "sticky";
    this.headerWrapper.style.top = 0;
    this.headerWrapper.style.zIndex = "100";

    this.headerBounds = {};
    this.currentScrollTop = 0;
    this.preventReveal = false;
    this.predictiveSearch = document.querySelector('predictive-search');

    this.onScrollHanlder = this.onScroll.bind(this);
    this.hideHanlderOnScrollUp = () => this.preventReveal = true;

    window.addEventListener('scroll', this.onScrollHanlder, false);

    this.createObserver();
  }

  disconnectedCallback() {
  }

  onScroll() {
    const scrollTop = window.pageYOffset;

    if(scrollTop > this.currentScrollTop && scrollTop > this.revealThreshold) {
      requestAnimationFrame(this.hide.bind(this));

    }else if(scrollTop < this.currentScrollTop) {
      requestAnimationFrame(this.show.bind(this))
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    this.header.style.transform = "translateY(-80px)"
    this.header.style.transition = "all 500ms";
  }

  show() {
    this.header.style.transform = "translateY(0)";
    this.header.style.transition = "all 500ms";

  }

  createObserver() {
    console.log("Creating Observer!")
    let ob = new IntersectionObserver((entries, ob) => {
      this.headerBounds = entries[0].intersectionRect;
      ob.disconnect();
    });
    ob.observe(this.headerWrapper);
  }
}

customElements.define('sticky-header', StickyHeader);
