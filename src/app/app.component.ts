import { Component } from '@angular/core';
import { GetDataMapService } from './services/get-data-map.service';
import { VERSION, ViewChild, ElementRef } from "@angular/core";
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nft-map';

  checkAPI = true;
  maxHeigth = 0;
  maxWidth = 0;

  mapWidth:any;
  map:any;

  tileSize:any;
  wall:any;
  pacman:any;
  dot:any;
  ghost:any;

  listDataLandHasOwner = [];


  @ViewChild('myCanvas', { static: true }) 
  myCanvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null 
  constructor(
    private getDataMapService : GetDataMapService,
    
  ){
      this.tileSize = 32;
      this.wall = this.#image("wall.png")
      this.dot = this.#image("ghost.png")
  }

  ngOnInit(): void {
    this.ctx = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');

    this.checkAPI = false;
    this.getDataMapService.getData().subscribe({
      next : res =>{
        this.checkAPI = true;
        
        this.checkSizeMap(res.map);
        this.getData(res);
        
      },
      error : err =>{
        this.checkAPI = true;
        console.log(err);
      }
    })
  }

  checkSizeMap(res:any){
    console.log(res);
    let maxWidthMinus = 0;
    let maxHeigthMinus = 0;
    let maxWidthPlus = 0;
    let maxHeigthPlus = 0;
    //TODO:IF ILL LOGIC CAN EDIT CHECK SIZE 
    res.forEach((element:any,index:number) => {
      if(index == 1){
        console.log(element);
        maxWidthMinus = element.location[0];
        maxHeigthMinus = element.location[1];
      }else{
        if(maxWidthMinus > element.location[0]){
          maxWidthMinus = element.location[0];
        }
        if (maxWidthPlus < element.location[0]){
          maxWidthPlus = element.location[0];
        }
        if(maxHeigthMinus > element.location[1]){
          maxHeigthMinus = element.location[1];
        }
        if(maxHeigthPlus < element.location[1]){
          maxHeigthPlus = element.location[1];
        }
      }
    }); 
    this.maxHeigth = maxHeigthPlus - maxHeigthMinus + 1;
    this.maxWidth = maxWidthPlus - maxWidthMinus + 1;
    console.log("maxHeigth",this.maxHeigth);
    console.log("maxWidth",this.maxWidth);
    
    let mapTemp = [];
    let j =1
    for(let j = 0; j < this.maxHeigth ; j++){
      let maptempw = [];
      for(let i = 0; i < this.maxWidth ; i++){
        maptempw.push(1);
      }
      mapTemp.push(maptempw);
    }
    
    
    this.map = mapTemp;

    this.map[0][0]= 0;
    this.map[0][1]= 0;
    this.map[1][0]= 0;
    this.map[1][1]= 0;
    //  setTimeout(() => {
    //   this.draw((this.myCanvas.nativeElement as HTMLCanvasElement),this.ctx);
    // }, 1000);

    // console.log(this.map[1][1] = 0);
    
    //TODO:LOCATION BUY ALREADY
    // this.process();
   
    console.log("this.listDataLandHasOwner",this.listDataLandHasOwner)
    
  }

  getData(res:any){
    console.log(res.map)

    let data: any[] = [];
    res.map.forEach((element:any)=> {
      if(element.is_available == false && element.owner_wallet_address != null && element.type.height > 0){
          data.push(element);
          console.log(data);
      }
    })
  }

  drawMap(){
    this.process();
  }

  process(){
    setTimeout(() => {
      this.draw((this.myCanvas.nativeElement as HTMLCanvasElement),this.ctx);
    }, 1000);
  //   this.map.forEach((element:any,index:any) => {
  //     element.forEach((element2:any,index2:any) => {
  //       console.log(index);
  //       console.log(index2)
  //           if(index == 0 &&  index2 == 0){
  //             element2 = 0;
  //             setTimeout(() => {
  //               this.draw((this.myCanvas.nativeElement as HTMLCanvasElement),this.ctx);
  //             }, 1000);
  //           }
  //     })
  // })
  }

  draw(canvas:any, ctx:any) {
    this.map[0][0] = 0;
    this.#setCanvasSize(canvas);
    this.#clearCanvas(canvas, ctx);
    this.#drawMap(ctx);
  }

  #drawMap(ctx:any) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        let image = null;
        switch (tile) {
          case 1:
            image = this.wall;
            break;
          case 0:
            image = this.dot;
            break;
          case 2:
            image = this.pacman;
            break;
          case 3:
            image = this.ghost;
            break;
        }

        if (image != null)
          ctx.drawImage(
            image,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
      }
    }
  }

  #clearCanvas(canvas:any, ctx:any) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  #setCanvasSize(canvas:any) {
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize;
  }
  #image(fileName:any){
    const img = new Image();
    img.src = `../assets/${(fileName)}`;
    return img;
  }
  
}
