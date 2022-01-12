
SELECT [VCTRLID]
      ,replace(convert(varchar(100),[DateTime],126),'T',' ') as [DateTime] 
      ,cast(round(MeasData,4) as numeric(20,4)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
      ,[LEVEL8]
  FROM [spctest].[dbo].[VDATA] where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  and ((LEVEL8 = @LEVEL8)or(@LEVEL8 is null and LEVEL8 in(LEVEL8)))
  and ((LorS = @LorS)or(@LorS is null and LorS in(LorS)))
  and ((format(DateTime,'yyyy-MM-dd') between @startDate and DATEADD(day,1,@endDate) 

  or (@startDate is null and format(DateTime,'yyyy-MM-dd') in (format(DateTime,'yyyy-MM-dd'))) 
  or (@endDate is null and format(DateTime,'yyyy-MM-dd') in (format(DateTime,'yyyy-MM-dd')))))
  order by format(DateTime,'yyyy-MM-dd') asc

 










-- SELECT [VCTRLID]
--       ,convert(varchar(100),[DateTime],126) as [DateTime] 
--       ,cast(round(MeasData,4) as numeric(20,4)) as [MeasData]
--       ,[LorS]
--       ,[LEVEL6]
--       ,[LEVEL7]
--       ,[LEVEL8]
--   FROM [spctest].[dbo].[VDATA] where DateTime between @startDate and DATEADD(day,1,@endDate)
--   and ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
--   or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
--   or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
--   or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)