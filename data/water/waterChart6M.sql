select Date, cast(round(SaveAmount,2) as numeric(20,2))as 'SaveAmount' from (select top 7 
convert(varchar(7), time, 126) as 'Date',
sum((CASE WHEN [I1sp] > 0 THEN (1-POWER([I1sp]/60,3))*15*746/1000
      WHEN [I2sp] > 0 THEN (1-POWER([I2sp]/60,3))*10*746/1000 END)) as 'SaveAmount'
from  [KEP].[dbo].[CH1WaterProjDB] where (convert(varchar,time, 126)) LIKE '%:00:%' 
group by convert(varchar(7), time, 126)  
order by convert(varchar(7), time, 126) desc)as A where Date<> convert(varchar(7), getdate(), 126) order by Date asc
