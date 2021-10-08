select A.Date, ROUND(A.A25TOC,2)as A25TOC from(SELECT TOP 24 [id]
,format(Time,'MM-dd HH:mm')as Date
,[MQTTproject_A25TOC_A25TOC_VALUE]as A25TOC
FROM [KEP].[dbo].[A2503DCS] where datepart(MINUTE,time) = '00' order by id desc)as A order by A.id asc;