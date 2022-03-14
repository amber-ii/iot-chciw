-- select Date, [a3f1]as a3t1
-- ,[a3f2] as a3t2
--       ,[a4f1]as a4t1
--       ,[a8f1]as a8t1
--       ,[a16f1]as a16t1
--       ,[a2f1]as a2t1
--  from(SELECT top 120
--       convert(varchar(5),[Time],108)as Date
--       ,[a3f1]
--       ,[a3f2]
--       ,[a4f1]
--       ,[a8f1]
--       ,[a16f1]
--       ,[a2f1]
--   FROM [KEP].[dbo].[N2RDB] order by convert(varchar,[Time],120) desc)A order by Date asc

select right(Date,11)as Date, [a3f1]as a3t1
,[a3f2] as a3t2
      ,[a4f1]as a4t1
      ,[a8f1]as a8t1
      ,[a16f1]as a16t1
      ,[a2f1]as a2t1
 from(SELECT top 720
      convert(varchar(16),[Time],120)as Date
      ,[a3f1]
      ,[a3f2]
      ,[a4f1]
      ,[a8f1]
      ,[a16f1]
      ,[a2f1]
  FROM [KEP].[dbo].[N2RDB] 
  where convert(varchar(16),[Time],120) like '%:_0'
  order by convert(varchar,[Time],120) desc)A order by right(Date,11) asc