export class OptimalBuy {
    private books : Array<Array<boolean>> =  new Array<Array<boolean>>(); //存放訂單的array，用boolean表示即可
                                                                          //表示第j筆的存放訂單，有哪幾本不同的書，true表示有，false表示沒有
    private booksdiffsize : Array<number> = [];                           //第j筆的存放訂單，有幾本不同的書(這樣不用額外用一個for去數有幾個)
    private _price = 0;                                                   //到第i筆order最低的價格是多少
    private discount:Array<number> = [-1,1,0.95,0.9,0.8,0.75];            //折扣(1本沒打折，2本0.95，3本0.9，4本0.8，5本0.75)
    bookorder_list(order: number[] ){           // order的每個元素的數值應介於0~4
        var insert_index:number = -1;           // 確認加入在哪個index下會有最小的花費(在books.length === 0 時為false，或是在每個books的array中都已具有該本書亦為false)
                                                // 而只要放的進去(insert_index不為-1)，就一定花費比8元小，所以如果放的進去只要判斷放在哪邊比較好，而放不進去就是要新增一個array放進去
        
        for(let i = 0 ; i < order.length ; i++){ //遍歷所有訂單    
            insert_index = -1;                   //將要加入的index預設為0
            var tempprice:number = this._price;  //為了避免更新this._price時會導致newprice錯誤，因此佔存一個到當前為止的價格

            for(let j = 0 ; j < this.books.length ; j++ ){          //遍歷存放訂單的array，並計算出加入在哪一筆訂單會取得較小的價格
                if(!this.books[j][order[i]]){                  //要先確定該筆訂單的book為空，這樣才可以把那本書加入該筆訂單
                    var diffnum:number = this.booksdiffsize[j];     //獲得該筆訂單已經有多少不同的書
                    var newprice: number = tempprice -  8 * diffnum * (this.discount[diffnum] - this.discount[diffnum+1]) + 8 * this.discount[diffnum+1];
                    //newprice更新方式如下:
                    //1.獲取當前price(tempprice)
                    //2.因為要加入那筆訂單，因此要扣掉8*不同書的數量*diffnum折扣，然後+上 8*(diffnum+1)*(diffnum+1的折扣)
                    //3.寫出newprice = tempprice -  8 * diffnum * (this.discount[diffnum] - this.discount[diffnum+1]) + 8 * this.discount[diffnum+1]; 公式
                    if(insert_index === -1 || this._price > newprice){  //假如insert_index === -1 則無條件更新insert_index 否則則比較是否有比較便宜
                        insert_index = j;                               //insert_index
                        this._price = newprice;                         //更新price
                    }
                }
            }
            if(insert_index === -1 ){                                   //假如搜尋完所有存放的訂單沒有能放進去的訂單，或是一開始存放訂單為空的情況下會走到這，就新增一筆存放訂單，把該本書的index設為1
                this.addnewBookArray(order[i]);                                      
            }else{
                this.books[insert_index][order[i]] = true;              //將該本書放在該筆存放訂單內
                this.booksdiffsize[insert_index] += 1;                  //該筆訂單不同書的數目+1
            }
        }
        this._price = Number(this._price.toFixed(1));   
        //遇到浮點誤差問題，因此取到小數點第1位去修正，而證明上也可表明取到小數第1位已足夠(1*8=8.0 ,2*8*0.95 = 15.2 ,3*8*0.9=21.6,4*8*0.8=25.6,5*8*0.75=30)
        //因此基本上留到小數第1位即可
    }
    
    private addnewBookArray(index:number){
        var newArray:boolean[] = [false,false,false,false,false];   //新增一筆存放訂單，全部都尚未放入
        newArray[index] = true;                                     //將要新增的訂單的書籍設為true
        this._price = this._price + 8;                              //由於只有一本，所以price+8
        this.books.push(newArray);                                  //將新的存放訂單放入books中
        this.booksdiffsize.push(1);                                 //由於只有一本書，因此push booksdiffsize為 1
    }

    get price() {
        return this._price;
    }
}
