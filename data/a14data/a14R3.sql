-- declare @startDate date
-- declare @endDate date
-- set @startDate = '2022-02-19'
-- set @endDate = '2022-02-20'
if @locationValue = 1
SELECT R3TTBOT,
R3TTENT,
R3TTOUT,
R3Feq,
convert(varchar,TIME,120)TIME
  FROM [KEP].[dbo].[A14PLC] where convert(varchar,TIME,120) between @startDate and @endDate 
  and R3CHANGE = 1
  order by TIME asc

  if @locationValue = 0
  SELECT R3TTBOT,
R3TTENT,
R3TTOUT,
R3Feq,
convert(varchar,TIME,120)TIME
  FROM [KEP].[dbo].[A14PLC] where convert(varchar,TIME,120) between @startDate and @endDate 
  order by TIME asc