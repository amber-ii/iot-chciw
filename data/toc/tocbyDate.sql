IF @tocValue IS NOT NULL
SELECT convert(varchar(16),A.Time,120)AS Date, cast(round(A25TOC,2) as numeric(5,2))AS A25TOC from (SELECT [id]
,time
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS])AS A where A.time between  @startDate and DATEADD(day,1,@endDate) and A25TOC >= @tocValue order by (A.time) asc;

IF @tocValue IS NULL
SELECT convert(varchar(16),A.Time,120)AS Date, cast(round(A25TOC,2) as numeric(5,2))AS A25TOC from (SELECT [id]
,time
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS])AS A where A.time between  @startDate and DATEADD(day,1,@endDate) order by (A.time) asc;