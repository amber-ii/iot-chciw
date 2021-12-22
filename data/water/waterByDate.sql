select Date,Press,I1sp,I2sp,cast(round(SaveAmount,3) as numeric(20,3))as 'SaveAmount' from (select format(time,'yyyy-MM-dd  HH:mm') as Date,
cast(round(Press,2) as numeric(5,2))as Press,
cast(round(I1sp,2) as numeric(5,2))as I1sp,
cast(round(I2sp,2) as numeric(5,2))as I2sp,
(CASE WHEN [I1sp] > 0 THEN (1-POWER([I1sp]/60,3))*15*746/1000
      WHEN [I2sp] > 0 THEN (1-POWER([I2sp]/60,3))*10*746/1000
      ELSE 0 END) as 'SaveAmount'
from  [KEP].[dbo].[CH1WaterProjDB] where (convert(varchar(100),time, 126)) LIKE  '%:00:%' )as A
where A.Date between  @startDate and @endDate order by (A.Date) asc

