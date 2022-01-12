SELECT distinct Ca.CardNo as 'CardNo', Em.Code 'Code', Em.CnName 'Name', De.ShortName 'Dep' FROM[HRMDB].[dbo].[Card] As Ca inner join[HRMDB].[dbo].[Employee] as Em on Ca.EmployeeId = Em.EmployeeId inner join[HRMDB].[dbo].[Department] as De on Em.DepartmentId = De.DepartmentId where Ca.CardNo in (@CardID) and Ca.RevokeTypeId = '-1' and Ca.UseTypeId = 'UseType_001'