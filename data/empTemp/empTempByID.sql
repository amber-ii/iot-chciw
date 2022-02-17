SELECT distinct Ca.CardNo as '卡號', Em.Code '工號', Em.CnName '姓名', 
De.Name '部門' FROM 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Card] As Ca 
inner join 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Employee] as Em 
on Ca.EmployeeId = Em.EmployeeId
inner join 
OpenDataSource('SQLOLEDB','server=192.168.1.182;uid=hrm;pwd=Jack@1021').[HRMDB].[dbo].[Department] as De 
on Em.DepartmentId = De.DepartmentId 
where 
 Ca.RevokeTypeId = '-1' and Ca.UseTypeId = 'UseType_001' and Ca.CardNo = @CardNo