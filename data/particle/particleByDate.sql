

--if @startDate is not null and @factory = 'A11' 找A11
if @startDate IS NOT NULL and @factory = 'A11'

select t1.lot,t1.factory,t1.date,t1.p5,t2.p3,t3.p2,t4.p1,t1.[LorS]
      ,t1.[LEVEL6]
      ,t1.[LEVEL7] from
(SELECT  distinct A.lot,A.factory, A.date,A.LorS,A.LEVEL6,A.LEVEL7
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p5 in(A.p5))as T1 join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  --and convert(varchar(10),[DateTime],120) 
  --between convert(varchar(10),@startDate,120) and 
  --convert(varchar(10),@endDate,120) 
  

  and (((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) = @factory)or(@factory is null and (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) in((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end))))

  and ((LEVEL8 = @LEVEL8)or(@LEVEL8 is null and LEVEL8 in(LEVEL8)))
  and ((LorS = @LorS)or(@LorS is null and LorS in(LorS))))AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p3 in(A.p3))as T2
  on T1.lot = T2.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p2 in(A.p2))as T3
  on T2.lot = t3.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
  
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p1 in(A.p1))as T4
  on t3.lot = t4.lot
  and convert(varchar(10),T1.date,120) 
  between convert(varchar(10),@startDate,120) and 
  convert(varchar(10),@endDate,120)
  and ((T1.factory = @factory)or(@factory is null and T1.factory in(T1.factory)))
  and ((T1.lot = @LEVEL8)or(@LEVEL8 is null and T1.lot in(T1.lot)))
  and ((T1.LorS = @LorS)or(@LorS is null and T1.LorS in(T1.LorS)))
order by t1.date



--if @startDate is not null and @factory <> 'A11'  找A25
if @startDate IS NOT NULL and @factory <> 'A11'
select t1.lot,t1.factory,t1.date,t1.p5,t2.p3,t3.p2,t4.p1,t5.p6,t6.p4,t1.[LorS]
      ,t1.[LEVEL6]
      ,t1.[LEVEL7] from
(SELECT  distinct A.lot,A.factory, A.date,A.LorS,A.LEVEL6,A.LEVEL7
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p5 in(A.p5))as T1 join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  --and convert(varchar(10),[DateTime],120) 
  --between convert(varchar(10),@startDate,120) and 
  --convert(varchar(10),@endDate,120) 
  

  and (((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) = @factory)or(@factory is null and (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) in((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end))))

  and ((LEVEL8 = @LEVEL8)or(@LEVEL8 is null and LEVEL8 in(LEVEL8)))
  and ((LorS = @LorS)or(@LorS is null and LorS in(LorS))))AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p3 in(A.p3))as T2
  on T1.lot = T2.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p2 in(A.p2))as T3
  on T2.lot = t3.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
  
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p1 in(A.p1))as T4
  on t3.lot = t4.lot join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
)AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
   
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p6 in(A.p6))as T5
  on t4.lot = t5.lot 
  join (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
    
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
     
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p4 in(A.p4))as T6 on t5.lot = t6.lot
  and convert(varchar(10),T1.date,120) 
  between convert(varchar(10),@startDate,120) and 
  convert(varchar(10),@endDate,120)
  and ((T1.factory = @factory)or(@factory is null and T1.factory in(T1.factory)))
  and ((T1.lot = @LEVEL8)or(@LEVEL8 is null and T1.lot in(T1.lot)))
  and ((T1.LorS = @LorS)or(@LorS is null and T1.LorS in(T1.LorS)))
order by t1.date


--if @startDate is null and @factory is null  單找批號、異常值
if @startDate is null and @factory is null
(select  t1.lot,t1.factory,t1.date,t1.p5,t2.p3,t3.p2,t4.p1,t5.p6,t6.p4,t1.[LorS]
      ,t1.[LEVEL6]
      ,t1.[LEVEL7] from
(SELECT  DISTINCT A.lot,A.factory, A.date,A.LorS,A.LEVEL6,A.LEVEL7
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p5 in(A.p5))as T1 join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  --and convert(varchar(10),[DateTime],120) 
  --between convert(varchar(10),@startDate,120) and 
  --convert(varchar(10),@endDate,120) 
  

  and (((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) = @factory)or(@factory is null and (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) in((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end))))

  and ((LEVEL8 = @LEVEL8)or(@LEVEL8 is null and LEVEL8 in(LEVEL8)))
  and ((LorS = @LorS)or(@LorS is null and LorS in(LorS))))AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p3 in(A.p3))as T2
  on T1.lot = T2.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p2 in(A.p2))as T3
  on T2.lot = t3.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
  
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p1 in(A.p1))as T4
  on t3.lot = t4.lot join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
)AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
   
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p6 in(A.p6))as T5
  on t4.lot = t5.lot 
  join (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
    
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
     
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p4 in(A.p4))as T6 on t5.lot = t6.lot
  --and convert(varchar(10),T1.date,120) 
  --between convert(varchar(10),@startDate,120) and 
  --convert(varchar(10),@endDate,120)
  and ((T1.factory = @factory)or(@factory is null and T1.factory in(T1.factory)))
  and ((T1.lot = @LEVEL8)or(@LEVEL8 is null and T1.lot in(T1.lot)))
  and ((T1.LorS = @LorS)or(@LorS is null and T1.LorS in(T1.LorS))))
UNION
(select DISTINCT t1.lot,t1.factory,t1.date,t1.p5,t2.p3,t3.p2,t4.p1,-9999,-9999,
t1.[LorS]
      ,t1.[LEVEL6]
      ,t1.[LEVEL7] from
(SELECT  distinct A.lot,A.factory, A.date,A.LorS,A.LEVEL6,A.LEVEL7
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p5 in(A.p5))as T1 join 
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  --and convert(varchar(10),[DateTime],120) 
  --between convert(varchar(10),@startDate,120) and 
  --convert(varchar(10),@endDate,120) 
  

  and (((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) = @factory)or(@factory is null and (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) in((case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end))))

  and ((LEVEL8 = @LEVEL8)or(@LEVEL8 is null and LEVEL8 in(LEVEL8)))
  and ((LorS = @LorS)or(@LorS is null and LorS in(LorS))))AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS B
  where A.lot = B.lot and A.p3 in(A.p3))as T2
  on T1.lot = T2.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      ,[LorS]
      ,[LEVEL6]
      ,[LEVEL7]
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
   
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p2 in(A.p2))as T3
  on T2.lot = t3.lot join
  (SELECT distinct A.lot,A.factory, A.date
,(case when A.p5 = 0.5 then A.MeasData end)p5
,(case when A.p3 = 0.3 then A.MeasData end)p3
,(case when A.p2 = 0.2 then A.MeasData end)p2
,(case when A.p1 = 0.1 then A.MeasData end)p1
,(case when A.p6 = 0.06 then A.MeasData end)p6
,(case when A.p4 = 0.04 then A.MeasData end)p4
from 
(SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'
		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
  
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
 )AS A
  , 
 (SELECT (case 
		when [VCTRLID] = 9553 then 'A25-1'
		when [VCTRLID] = 9554 then 'A25-1'
		when [VCTRLID] = 9555 then 'A25-1'
		when [VCTRLID] = 11294 then 'A25-1'
		when [VCTRLID] = 11295 then 'A25-1'
		when [VCTRLID] = 9564 then 'A25-1'

		when [VCTRLID] = 9649 then 'A25-2'
		when [VCTRLID] = 9650 then 'A25-2'
		when [VCTRLID] = 9651 then 'A25-2'
		when [VCTRLID] = 11296 then 'A25-2'
		when [VCTRLID] = 11297 then 'A25-2'
		when [VCTRLID] = 9660 then 'A25-2'

		when [VCTRLID] = 9368 then 'A25-3'
		when [VCTRLID] = 9369 then 'A25-3'
		when [VCTRLID] = 9370 then 'A25-3'
		when [VCTRLID] = 11298 then 'A25-3'
		when [VCTRLID] = 11299 then 'A25-3'
		when [VCTRLID] = 9379 then 'A25-3'

		when [VCTRLID] = 9837 then 'A11'
		when [VCTRLID] = 9836 then 'A11'
		when [VCTRLID] = 9835 then 'A11'
		when [VCTRLID] = 9844 then 'A11'
		end) as 'factory',
		convert(varchar,[DateTime],120) as 'date',
		LEVEL8 as 'lot',
		--um開始

		(case 
		when [VCTRLID] = 9555  then '0.5'
		when [VCTRLID] = 9651  then '0.5'
		when [VCTRLID] = 9370  then '0.5'
		when [VCTRLID] = 9835  then '0.5'
		end) as 'p5',
		(case 
		when [VCTRLID] =  9554  then '0.3'
		when [VCTRLID] =  9650  then '0.3'
		when [VCTRLID] =  9369  then '0.3'
		when [VCTRLID] =  9836  then '0.3'
		end)as 'p3',
		(case 
		when [VCTRLID] = 9553   then '0.2'
		when [VCTRLID] =  9649  then '0.2'
		when [VCTRLID] = 9368   then '0.2'
		when [VCTRLID] =  9837  then '0.2'
		end) as 'p2',
		(case
		when [VCTRLID] =  9564 then '0.1'
		when [VCTRLID] =  9660 then '0.1'
		when [VCTRLID] =  9379 then '0.1'
		when [VCTRLID] =  9844 then '0.1'
		end) as 'p1',
		(case
		when [VCTRLID] = 11294   then '0.06'
		when [VCTRLID] = 11296   then '0.06'
		when [VCTRLID] =  11298  then '0.06'
		end) as 'p6',
		(case
		when [VCTRLID] = 11295   then '0.04'
		when [VCTRLID] =  11297 then '0.04'
		when [VCTRLID] = 11299  then '0.04'
		end) as 'p4'
      
      ,cast(round(MeasData,1) as numeric(20,1)) as [MeasData]
      
     
  FROM [spctest].[dbo].[VDATA]
  where 
    ([VCTRLID] = 9553 or [VCTRLID] =  9554 or [VCTRLID] = 9555 or [VCTRLID] =  11294 or [VCTRLID] = 11295 or [VCTRLID] = 9564
  or [VCTRLID] = 9649 or [VCTRLID] =  9650 or [VCTRLID] = 9651 or [VCTRLID] =  11296 or [VCTRLID] = 11297 or [VCTRLID] = 9660
  or [VCTRLID] = 9368 or [VCTRLID] =  9369 or [VCTRLID] = 9370 or [VCTRLID] =  11298 or [VCTRLID] = 11299 or [VCTRLID] = 9379
  or [VCTRLID] = 9837 or [VCTRLID] = 9836 or [VCTRLID] = 9835 or [VCTRLID] = 9844)
  )AS B
  where A.lot = B.lot and A.p1 in(A.p1))as T4
  on t3.lot = t4.lot  
  
  where T1.factory = 'A11'
  and ((T1.lot = @LEVEL8)or(@LEVEL8 is null and T1.lot in(T1.lot)))
  and ((T1.LorS = @LorS)or(@LorS is null and T1.LorS in(T1.LorS))))
