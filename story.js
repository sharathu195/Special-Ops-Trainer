class Story {
    constructor(){
        this.button = createButton("Play game");
    }

    display(){
        this.button.position(displayWidth/2-440, displayHeight/2+200);
        this.button.style('font-size', '20px');
        this.button.style('background-color', color(196,162,111));
        this.button.mousePressed(()=>{
            gameState = 1;
            this.button.hide();
        })
    }
}