-- select A.id,A.Date,cast(round(A25TOC,2) as numeric(5,2))as A25TOC from (SELECT TOP 60 [id]
-- ,format(Time,'MM-dd HH:mm')as Date
-- ,[MQTTproject_A25TOC_A25TOC_VALUE]as A25TOC
-- FROM [KEP].[dbo].[A2503DCS] order by id desc)As A order by A.id asc;

select A.id,A.Date,cast(round(A25TOC,2) as numeric(5,2))as A25TOC from (SELECT TOP 180 [id]
,right(convert(varchar(16),Time,120),11)as Date
,[MQTTproject_A25TOC_A25TOC_VALUE]as A25TOC
FROM [KEP].[dbo].[A2503DCS] order by id desc)As A order by A.id asc;


-- 查詢過去的一小時一分鐘一筆