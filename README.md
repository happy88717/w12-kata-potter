# Potter
If you want to try this Kata for yourself or at your dojo meeting, read the problem description and see if the Kata appeals to you. The rest is commentary and helpful clues for if you get stuck solving it. I would recommend trying the Kata for yourself before reading too much of it.

## Problem Description
Once upon a time there was a series of 5 books about a very English hero called Harry. (At least when this Kata was invented, there were only 5. Since then they have multiplied) Children all over the world thought he was fantastic, and, of course, so did the publisher. So in a gesture of immense generosity to mankind, (and to increase sales) they set up the following pricing model to take advantage of Harry’s magical powers.

One copy of any of the five books costs 8 EUR. If, however, you buy two different books from the series, you get a 5% discount on those two books. If you buy 3 different books, you get a 10% discount. With 4 different books, you get a 20% discount. If you go the whole hog, and buy all 5, you get a huge 25% discount.

Note that if you buy, say, four books, of which 3 are different titles, you get a 10% discount on the 3 that form part of a set, but the fourth book still costs 8 EUR.

Potter mania is sweeping the country and parents of teenagers everywhere are queueing up with shopping baskets overflowing with Potter books. Your mission is to write a piece of code to calculate the price of any conceivable shopping basket, giving as big a discount as possible.

For example, how much does this basket of books cost?

2 copies of the first book
2 copies of the second book
2 copies of the third book
1 copy of the fourth book
1 copy of the fifth book

Answer: 51.20 EUR

|  0  |  1   |  2  |  3   |  4  |          算法    							          |  價格 |
|-----|------|-----|------|-----|-----------------------------------------|--------|
|     |      |     |      |     |     0 * 8									              |  0.00  |
|  1  |      |     |      |     |     1 * 8									              |  8.00  |
|     |  1   |     |      |     |     1 * 8									              |  8.00  |
|     |      |  1  |      |     |     1 * 8									              |  8.00  |
|     |      |     |  1   |     |     1 * 8									              |  8.00  |
|     |      |     |      |  1  |     1 * 8									              |  8.00  |
|  1  |  1   |     |      |     |     2 * 8 * 0.95							          |  15.20 |
|  1  |  1   |  1  |      |     |     3 * 8 * 0.9							            |  21.60 |
|  1  |  1   |  1  |  1   |     |     4 * 8 * 0.8							            |  25.60 |
|  1  |  1   |  1  |  1   |  1  |     5 * 8 * 0.75							          |  30.00 |
|  2  |      |     |      |     |     2 * 8									              |  16.00 |
|  2  |  1   |     |      |     |     2 * 8 * 0.95 + 1 * 8					      |  23.20 |
|  2  |  1   |  1  |      |     |     3 * 8 * 0.90 + 1 * 8					      |  29.60 |
|  2  |  2   |  2  |  1   |  1  | 4 * 8 * 0.8 + 4 * 8 * 0.8					      |  51.20 |
|  5  |  5   |  4  |  5   |  4  | 3 * (5 * 8 * 0.75) + 2 * (4 * 8 * 0.8)	| 141.20 |

## Solution Description
Use TypeScript to solve it
1.首先建立一個二維陣列books，型態為boolean，所以如果為2-1-1-0-0這筆測資，其books應長成這樣
[[true,true,true,false,false]   
[true,false,false,false,false]]
其意義代表第一筆儲存訂單有 0、1、2 三本書
         第二筆儲存訂單有 0 這本書

另外建立一個陣列booksdiffsize 儲存訂單中有幾本不同的書，以2-1-1-0-0這筆測資，由上述已知books長怎樣，因此可以知道其booksdiffsize為
[3,1]

2.描述如何計算
由小逐步將訂單加入儲存訂單中，而設定insert_index並計算如果加在哪筆儲存訂單中會得到較小的價格，一開始insert_index 為-1，如果遍歷完books後發現加不進去，則新增一筆儲存訂單加進去，最後即可得出答案

