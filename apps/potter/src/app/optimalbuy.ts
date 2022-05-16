export class OptimalBuy {
    private books : Array<Array<boolean>> =  new Array<Array<boolean>>(); //�s��q�檺array�A��boolean��ܧY�i
                                                                          //��ܲ�j�����s��q��A�����X�����P���ѡAtrue��ܦ��Afalse��ܨS��
    private booksdiffsize : Array<number> = [];                           //��j�����s��q��A���X�����P����(�o�ˤ����B�~�Τ@��for�h�Ʀ��X��)
    private _price = 0;                                                   //���i��order�̧C������O�h��
    private discount:Array<number> = [-1,1,0.95,0.9,0.8,0.75];            //�馩(1���S����A2��0.95�A3��0.9�A4��0.8�A5��0.75)
    bookorder_list(order: number[] ){           // order���C�Ӥ������ƭ�������0~4
        var insert_index:number = -1;           // �T�{�[�J�b����index�U�|���̤p����O(�bbooks.length === 0 �ɬ�false�A�άO�b�C��books��array�����w�㦳�ӥ��ѥ笰false)
                                                // �ӥu�n�񪺶i�h(insert_index����-1)�A�N�@�w��O��8���p�A�ҥH�p�G�񪺶i�h�u�n�P�_��b�������n�A�ө񤣶i�h�N�O�n�s�W�@��array��i�h
        
        for(let i = 0 ; i < order.length ; i++){ //�M���Ҧ��q��    
            insert_index = -1;                   //�N�n�[�J��index�w�]��0
            var tempprice:number = this._price;  //���F�קK��sthis._price�ɷ|�ɭPnewprice���~�A�]�����s�@�Ө��e�������

            for(let j = 0 ; j < this.books.length ; j++ ){          //�M���s��q�檺array�A�íp��X�[�J�b���@���q��|���o���p������
                if(!this.books[j][order[i]]){                  //�n���T�w�ӵ��q�檺book���šA�o�ˤ~�i�H�⨺���ѥ[�J�ӵ��q��
                    var diffnum:number = this.booksdiffsize[j];     //��o�ӵ��q��w�g���h�֤��P����
                    var newprice: number = tempprice -  8 * diffnum * (this.discount[diffnum] - this.discount[diffnum+1]) + 8 * this.discount[diffnum+1];
                    //newprice��s�覡�p�U:
                    //1.�����eprice(tempprice)
                    //2.�]���n�[�J�����q��A�]���n����8*���P�Ѫ��ƶq*diffnum�馩�A�M��+�W 8*(diffnum+1)*(diffnum+1���馩)
                    //3.�g�Xnewprice = tempprice -  8 * diffnum * (this.discount[diffnum] - this.discount[diffnum+1]) + 8 * this.discount[diffnum+1]; ����
                    if(insert_index === -1 || this._price > newprice){  //���pinsert_index === -1 �h�L�����sinsert_index �_�h�h����O�_������K�y
                        insert_index = j;                               //insert_index
                        this._price = newprice;                         //��sprice
                    }
                }
            }
            if(insert_index === -1 ){                                   //���p�j�M���Ҧ��s�񪺭q��S�����i�h���q��A�άO�@�}�l�s��q�欰�Ū����p�U�|����o�A�N�s�W�@���s��q��A��ӥ��Ѫ�index�]��1
                this.addnewBookArray(order[i]);                                      
            }else{
                this.books[insert_index][order[i]] = true;              //�N�ӥ��ѩ�b�ӵ��s��q�椺
                this.booksdiffsize[insert_index] += 1;                  //�ӵ��q�椣�P�Ѫ��ƥ�+1
            }
        }
        this._price = Number(this._price.toFixed(1));   
        //�J��B�I�~�t���D�A�]������p���I��1��h�ץ��A���ҩ��W�]�i�������p�Ʋ�1��w����(1*8=8.0 ,2*8*0.95 = 15.2 ,3*8*0.9=21.6,4*8*0.8=25.6,5*8*0.75=30)
        //�]���򥻤W�d��p�Ʋ�1��Y�i
    }
    
    private addnewBookArray(index:number){
        var newArray:boolean[] = [false,false,false,false,false];   //�s�W�@���s��q��A�������|����J
        newArray[index] = true;                                     //�N�n�s�W���q�檺���y�]��true
        this._price = this._price + 8;                              //�ѩ�u���@���A�ҥHprice+8
        this.books.push(newArray);                                  //�N�s���s��q���Jbooks��
        this.booksdiffsize.push(1);                                 //�ѩ�u���@���ѡA�]��push booksdiffsize�� 1
    }

    get price() {
        return this._price;
    }
}
