select A.Date, cast(round(A25TOC,2) as numeric(5,2))AS A25TOC from (SELECT TOP 30 [id]
, (convert(varchar(100),time, 111)) as Date
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS]  where (convert(varchar(100),time, 126)) LIKE  '%00:00:%' order by id desc)AS A order by A.Date asc;