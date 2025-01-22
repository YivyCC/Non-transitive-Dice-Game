import { AsciiTable3, AlignmentEnum } from 'ascii-table3';

class TableGenerator {
    static generateProbabilityTable(probMatrix, dice) {
        let header = [];
        let rowMatrix = [];
        let rowArray = [];
        for (let i=0; i<=dice.length; i++){
            for (let k=0; k<=dice.length+1; k++){
                if (i==0){
                    if(k==0){
                        header.push('Index');
                    }
                    else if(k==1){
                        header.push('Dice');
                    }
                    else{
                        header.push(`% against i${k-2}`);
                    }
                } else{
                    if(k==0){
                        rowArray.push(i-1);
                    }
                    else if(k==1){
                        rowArray.push(dice[i-1]);
                    }
                    else{
                        rowArray.push(probMatrix[i-1][k-2]);
                    }
                }
            }
            if (i>0){
                rowMatrix.push(rowArray);
                rowArray=[];
            }
        }

        var table = 
        new AsciiTable3('Probability Table')
        .setHeading(...header)
        .setAlign(3, AlignmentEnum.CENTER)
        .addRowMatrix(rowMatrix);

        return table.toString();
    }
}

export default TableGenerator;