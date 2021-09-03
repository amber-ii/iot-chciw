select A.id,(B.id)AS BID , A.Date, (A.A9F1-B.A9F1)AS A9Diff ,(A.A10F1-B.A10F1)AS A10Diff1,(A.A10F4-B.A10F4)AS A10Diff4,   (A.A9F1-B.A9F1)+(A.A10F1-B.A10F1)+(A.A10F4-B.A10F4) AS total  ,(A.A10F2-B.A10F2)AS A10Diff2,(A.A10F3-B.A10F3)AS A10Diff3,(A.A10F3-B.A10F3)-(A.A10F2-B.A10F2) AS diff32
from 
(SELECT TOP (8) ROW_NUMBER() OVER (ORDER BY convert(varchar(100),time, 111)) AS id ,([A9F1p] - [A9F1n])as A9F1,([A10F1p] - [A10F1n])as A10F1,([A10F2p] - [A10F2n])as A10F2,([A10F3p] - [A10F3n])as A10F3,([A10F4p] - [A10F4n])as A10F4
      , (convert(varchar(100),time, 111)) as Date
  FROM [KEP].[dbo].[CH1ACIFLOW]  where (convert(varchar(100),time, 126)) LIKE  '%07:00:%'  order by id desc)AS A , 
  (SELECT TOP (8) ROW_NUMBER() OVER (ORDER BY convert(varchar(100),time, 111))  AS id, ([A9F1p] - [A9F1n])as A9F1,([A10F1p] - [A10F1n])as A10F1,([A10F2p] - [A10F2n])as A10F2,([A10F3p] - [A10F3n])as A10F3,([A10F4p] - [A10F4n])as A10F4
      , (convert(varchar(100),time, 111)) as Date
  FROM [KEP].[dbo].[CH1ACIFLOW]  where (convert(varchar(100),time, 126)) LIKE  '%07:00:%'  order by id desc)AS B
  where B.id = A.id-1 and B.id=@BID order by B.Date asc
