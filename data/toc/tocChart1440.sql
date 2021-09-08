-- select A.Date, ROUND(A.A25TOC, 2)AS A25TOC from (SELECT TOP 40 [id]
-- , convert(varchar(100),time,20) AS Date
-- ,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
-- FROM [KEP].[dbo].[A2503DCS] order by id desc)AS A order by A.Date;


select concat(DATEPART(month,(convert(varchar(100),A.t2,111))),'/',DATEPART(DAY,(convert(varchar(100),A.t2,111))) ,'  ',DATEPART (HOUR, A.Date),':',DATEPART (MINUTE, A.Date))AS Date, ROUND(A.A25TOC, 2)AS A25TOC from (SELECT TOP 40 [id]
, convert(varchar(100),time,20) AS Date,convert(varchar(100),time,111)AS t2
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS] order by id desc)AS A order by A.Date;



-- 查詢過去的一小時一分鐘一筆