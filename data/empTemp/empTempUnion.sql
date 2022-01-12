IF datepart(Hour,getdate()) = 9 
(select T2.No '工號', T2.Dep '部門' ,
T2.Name'姓名'
,cast(round(T1.Temp,2) as numeric(10,2)) as '體溫' 
,cast(round(T1.AvgTemp,2) as numeric(10,2)) as '七天均溫' 
from (SELECT 
A.[CardID]
,convert(varchar(18),B.TIME,120)'Date'
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
and right(convert(varchar(18),B.TIME,120),7)
between '00:00:0' 
and '09:00:0'
group by A.[CardID],convert(varchar(18),B.TIME,120),B.[MSC]
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
on T1.[CardID] = T2.CardNo)
IF datepart(Hour,getdate()) = 16
(select T2.No '工號', T2.Dep '部門' ,
T2.Name'姓名'
,cast(round(T1.Temp,2) as numeric(10,2)) as '體溫' 
,cast(round(T1.AvgTemp,2) as numeric(10,2)) as '七天均溫' 
from (SELECT 
A.[CardID]
,convert(varchar(18),B.TIME,120)'Date'
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
and right(convert(varchar(18),B.TIME,120),7)
between '09:00:0' 
and '16:30:0'
group by A.[CardID],convert(varchar(18),B.TIME,120),B.[MSC]
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
on T1.[CardID] = T2.CardNo)

IF datepart(Hour,getdate()) = 20
(select T2.No '工號', T2.Dep '部門' ,
T2.Name'姓名'
,cast(round(T1.Temp,2) as numeric(10,2)) as '體溫' 
,cast(round(T1.AvgTemp,2) as numeric(10,2)) as '七天均溫' 
from (SELECT 
A.[CardID]
,convert(varchar(18),B.TIME,120)'Date'
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
and right(convert(varchar(18),B.TIME,120),7)
between '16:30:0' 
and '20:30:0'
group by A.[CardID],convert(varchar(18),B.TIME,120),B.[MSC]
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
on T1.[CardID] = T2.CardNo)
