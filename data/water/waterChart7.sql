select Date, cast(round(SaveAmount,2) as numeric(20,2))as 'SaveAmount' 
from (select top 8 convert(varchar(10),time,126) as 'Date',
sum((CASE WHEN [I1sp] > 0 THEN (1-POWER([I1sp]/60,3))*15*746/1000
      WHEN [I2sp] > 0 THEN (1-POWER([I2sp]/60,3))*10*746/1000 END)) as 'SaveAmount'
from  [KEP].[dbo].[CH1WaterProjDB] where (convert(varchar,time,126)) LIKE '%:00:%' 
group by convert(varchar(10),time,126)
order by convert(varchar(10),time,126) desc)as A where Date<> convert(varchar(10),GetDate(),126) 
order by Date asc

--cast(round(A25TOC,2) as numeric(5,2))

-- select Date, cast(round(SaveAmount,2) as numeric(20,2))as 'SaveAmount' 
-- from (select top 8 format(time,'yyyy-MM-dd') as 'Date',
-- sum((CASE WHEN [I1sp] > 0 THEN (1-POWER([I1sp]/60,3))*15*746/1000
--       WHEN [I2sp] > 0 THEN (1-POWER([I2sp]/60,3))*10*746/1000 END)) as 'SaveAmount'
-- from  [KEP].[dbo].[CH1WaterProjDB] where (convert(varchar(100),time, 126)) LIKE '%:00:%' 
-- group by format(time,'yyyy-MM-dd') 
-- order by format(time,'yyyy-MM-dd') desc)as A where Date<> format(GETDATE(),'yyyy-MM-dd') 
-- order by Date asc