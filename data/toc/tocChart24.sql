select  concat( a.Date, ' - ' ,a.Hour, ':00') As Date, ROUND(A.A25TOC, 2)AS A25TOC from (SELECT TOP 24 [id]
, DATEPART ( MINUTE , time)As time,DATEPART ( HOUR, time)As Hour ,(convert(varchar(100),time, 111)) as Date
,[MQTTproject_A25TOC_A25TOC_VALUE]AS A25TOC
FROM [KEP].[dbo].[A2503DCS] where DATEPART ( MINUTE , time) ='00' group by DATEPART ( MINUTE , time),DATEPART ( HOUR, time),id ,convert(varchar(100),time, 111),MQTTproject_A25TOC_A25TOC_VALUE order by id desc)AS A order by A.Time;

