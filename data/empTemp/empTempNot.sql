select A.Dep,A.Name from
(SELECT distinct Ca.CardNo as 'CardNo', Em.Code 'No', Em.CnName 'Name',
De.Name 'Dep' FROM
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Card] As Ca
inner join
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Employee] as Em
on Ca.EmployeeId = Em.EmployeeId
inner join
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Department] as De
on Em.DepartmentId = De.DepartmentId and Ca.RevokeTypeId = '-1' and Ca.UseTypeId = 'UseType_001') as A
where A.CardNo not in(select distinct CardID
from [KEP].[dbo].[TempTrend] where convert(varchar(10),[TIME],111)
between convert(varchar(10),getdate(),111)
and convert(varchar(10),getdate(),111))

 order by A.Dep asc