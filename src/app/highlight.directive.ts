import { Input, HostListener } from "@angular/core";
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  @Input("appHighlight") highlightColor: string;
  @HostListener("mouseenter") onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
