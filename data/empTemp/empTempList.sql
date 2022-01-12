--avgTemp
SELECT 
A.[CardID]
,convert(varchar(10),B.TIME,111)'Date'
,max(B.Temp)'Temp'
,avg(A.maxt)'AvgTemp'
,B.[MSC]
FROM 
--子查詢
(SELECT 
[CardID]
,convert(varchar(10),[TIME],111)'date'
,max([Temp])'maxt'
FROM [KEP].[dbo].[TempTrend] where 

convert(varchar(10),[TIME],111) 
between convert(varchar(10),getdate()-7,111) 
and convert(varchar(10),getdate()-1,111)
group by [CardID],convert(varchar(10),[TIME],111))As A join [KEP].[dbo].[TempTrend]As B
on A.CardID = B.CardID
where convert(varchar(10),B.TIME,111) 
between convert(varchar(10),getdate(),111) 
and convert(varchar(10),getdate(),111)
group by A.[CardID],convert(varchar(10),B.TIME,111),B.[MSC]
having (max(B.Temp) - avg(A.maxt)) > 1


