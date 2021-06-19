import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("canvas") public canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("container") public container: ElementRef<HTMLDivElement>;

  brightnessValue: Number = 0;
  contrastValue: Number = 0;
  redValue: Number = 0;
  greenValue: Number = 0;
  blueValue: Number = 0;

  image: HTMLImageElement;
  imageModified: HTMLImageElement;
  context: CanvasRenderingContext2D;
  painted: Boolean;

  ngOnInit() {}
  public ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.image = new Image();
    this.image.crossOrigin = "Anonymous";
    this.image.onload = () => {
      this.context.drawImage(
        this.image,
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    };
    this.image.src = "/assets/image1.png";
    this.canvas.nativeElement.width = this.container.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.container.nativeElement.clientHeight;
  }

  brightnessSliderChange() {
    let imageData;

    this.redrawImage();

    imageData = this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.applyChanges(imageData);
    this.context.putImageData(imageData, 0, 0);
  }

  redSliderChange() {
    let imageData;

    this.redrawImage();

    imageData = this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.applyChanges(imageData);
    this.context.putImageData(imageData, 0, 0);
  }

  blueSliderChange() {
    let imageData;

    this.redrawImage();

    imageData = this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.applyChanges(imageData);
    this.context.putImageData(imageData, 0, 0);
  }

  greenSliderChange() {
    let imageData;

    this.redrawImage();

    imageData = this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.applyChanges(imageData);
    this.context.putImageData(imageData, 0, 0);
  }

  drawImage(image) {
    this.context.drawImage(
      image,
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  redrawImage() {
    this.drawImage(this.image);
  }

  applyChanges(imageData) {
    this.applyBrightness(imageData.data, this.brightnessValue);
    this.applyRedShift(imageData.data, this.redValue);
    this.applyBlueShift(imageData.data, this.blueValue);
    this.applyGreenShift(imageData.data, this.greenValue);
  }

  applyBrightness(data, brightness) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 255 * (brightness / 100);
      data[i + 1] += 255 * (brightness / 100);
      data[i + 2] += 255 * (brightness / 100);
    }
  }

  applyRedShift(data, red) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 255 * (red / 100);
    }
  }

  applyGreenShift(data, green) {
    for (let i = 0; i < data.length; i += 4) {
      data[i + 1] += 255 * (green / 100);
    }
  }

  applyBlueShift(data, blue) {
    for (let i = 0; i < data.length; i += 4) {
      data[i + 2] += 255 * (blue / 100);
    }
  }
}
