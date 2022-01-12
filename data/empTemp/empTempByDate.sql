select T1.Date, T2.No,T2.Dep,T2.Name
,cast(round(T1.Temp,2) as numeric(4,2)) as Temp
,cast(round(T1.AvgTemp,2) as numeric(4,2)) as AvgTemp 
from (SELECT 
A.[CardID]
,convert(varchar(10),B.TIME,111)'Date'
,max(B.Temp)'Temp'
,avg(A.maxt)'AvgTemp'
,B.[MSC]
FROM 

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
having (max(B.Temp) - avg(A.maxt)) > 1)as T1 join 


(SELECT distinct Ca.CardNo as 'CardNo', Em.Code 'No', Em.CnName 'Name', 
De.ShortName 'Dep' FROM 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Card] As Ca 
inner join 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Employee] as Em 
on Ca.EmployeeId = Em.EmployeeId
inner join 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Department] as De 
on Em.DepartmentId = De.DepartmentId 
where 
 Ca.RevokeTypeId = '-1' and Ca.UseTypeId = 'UseType_001')as T2
on T1.[CardID] = T2.CardNo;