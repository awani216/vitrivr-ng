import {Component, ViewChild, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {SketchCanvas} from "../../../shared/components/sketch/sketch-canvas.component";

@Component({
    moduleId: module.id,
    selector: 'binary-sketchpad',
    templateUrl: 'binary-sketch-dialog.component.html'
})

export class BinarySketchDialogComponent implements AfterViewInit {
    /** Hidden input for image upload. */
    @ViewChild('imageloader')
    private imageloader: any;

    /** Sketch-canvas component. */
    @ViewChild('sketch')
    private _sketchpad: SketchCanvas;

    /** Default color (black) . */
    public color : string = "#000000";

    /**
     *
     * @param dialogRef
     */
    constructor(private dialogRef: MdDialogRef<BinarySketchDialogComponent>) {
    }


    /**
     * Invoked after initialization. applies the binary mode, if specified.
     */
    ngAfterViewInit(): void {
        this.onClearCanvasClicked();
    }

    /**
     * Change listener for the input field (File chooser). Handles the
     * image upload.
     *
     * @param event
     */
    @HostListener('change', ['$event'])
    onChange(event: any) {
        let URL = window.URL;
        this._sketchpad.setImageBase64(URL.createObjectURL(event.target.files[0]))
    };

    /**
     * Getter for SketchCanvas
     */
    get sketchpad() : SketchCanvas {
        return this._sketchpad;
    }

    /**
     * Triggered when a color value is selected.
     *
     * @param color
     */
    public onColorChange(color: any) {
        this.color = color;
        this._sketchpad.setActiveColor(this.color);
    }

    /**
     * Triggered when the slider-value for the line-size changes.
     *
     * @param size
     */
    public onLineSizeChange(size : any) {
        this._sketchpad.setLineSize(size.value);
    }

    /**
     * Triggered when the 'Clear canvas' menu-item is pressed.
     *
     * Clears the canvas
     */
    public onClearCanvasClicked() {
        this._sketchpad.setActiveColor("#000000");
        this._sketchpad.fillCanvas();
        this._sketchpad.setActiveColor("#FFFFFF");
    }

    /**
     * Triggered when the 'Fill canvas' menu-item is pressed.
     *
     * Fills the canvas with the default color.
     */
    public onFillCanvasClicked() {
        this._sketchpad.fillCanvas();
    }
}