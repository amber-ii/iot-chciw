
select (B.n2rDate) AS Date, (A.a3t1-B.a3t1) AS a3t1,(A.a3t2-B.a3t2) AS a3t2,(A.a4t1-B.a4t1) AS a4t1,(A.a8t1-B.a8t1) AS a8t1,(A.a16t1-B.a16t1) AS a16t1,cast(round((isnull(A.a2t1,0)-isnull(B.a2t1,0)),2) as numeric(20,2)) AS a2t1
from 
(SELECT ROW_NUMBER() OVER (ORDER BY convert(varchar(100),time, 111)) AS id ,  [a3t1]
      ,[a3t2]
      ,[a4t1]
      ,[a8t1]
      ,[a16t1]
      ,[a2t1],
       (convert(varchar(100),time, 111)) as n2rDate
  FROM [KEP].[dbo].[N2RDB]  where (convert(varchar(100),time, 126)) LIKE  '%00:00:%' )AS A , 
  (SELECT ROW_NUMBER() OVER (ORDER BY convert(varchar(100),time, 111))  AS id,  [a3t1]
      ,[a3t2]
      ,[a4t1]
      ,[a8t1]
      ,[a16t1]
      ,[a2t1],
      (convert(varchar(100),time, 111)) as n2rDate
  FROM [KEP].[dbo].[N2RDB]  where (convert(varchar(100),time, 126)) LIKE  '%00:00:%' )AS B
  where B.id = A.id-1 and B.n2rDate  between  @startDate and @endDate;



