-- select (A.Date) AS Date, ROUND(A.A25TOC, 2)AS A25TOC from (SELECT  [id]
-- , (convert(varchar(100),time, 111)) as Date
-- ,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
-- FROM [KEP].[dbo].[A2503DCS]  where (convert(varchar(100),time, 126)) LIKE  '%00:00:%')AS A where A.Date between  @startDate and @endDate order by (A.Date) asc;

SELECT FORMAT(A.time, 'yyyy-MM-dd HH:mm')AS Date, cast(round(A25TOC,2) as numeric(5,2))AS A25TOC from (SELECT [id]
,time
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS])AS A where A.time between  @startDate and DATEADD(day,1,@endDate) order by (A.time) asc;