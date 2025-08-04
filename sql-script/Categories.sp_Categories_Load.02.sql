-- exec sp_Categories_Load @CategoryId=1, @DirectChild=1
-- exec sp_Categories_Load @CategoryId=1
-- exec sp_Categories_Load @CategoryId=4
-- exec sp_Categories_Load @CategoryId=0

if object_id('sp_Categories_Load') is not null drop proc sp_Categories_Load
go
create proc sp_Categories_Load
    @CategoryId bigint=0 /*0: only load best parent*/
    , @DirectChild bigint=null /*1:chi load con truc tiep, else:load all*/
    , @Lang varchar=''
as
/*
declare
    @CategoryId int=4--0--
    , @DirectChild bit=null /*1:chi load con truc tiep, else:load all*/
    , @Lang varchar=''
--*/
set nocount on
if @CategoryId is null set @CategoryId=0
if object_id('tempdb..#t') is not null drop table #t
--==========================================================================
print N'[DE QUY] Tim tat ca Node Con (child nodes) cua 1 NodeId.'
;with r as (
    select Id, ParentId, Ord=cast(Id as nvarchar(max))
    from Categories
    where @CategoryId<>0 and Id=@CategoryId
    --> Node muc tieu
    union all
    select c.Id, c.ParentId, Ord=cast(concat(p.Ord,'.',c.Id) as nvarchar(max))
    from Categories c
        inner join r p on p.Id=c.ParentId
)
select * into #t from r
-- select * from #t return ---for debug

--==========================================================================
if @CategoryId=0 begin
    print N'chi load nhung [Node Cha nhat].'
    insert into #t (Id, ParentId)
    select Id, ParentId from Categories
    where @CategoryId=0 and ParentId is null
    -- select * from #t return ---for debug
end

--==========================================================================
if @DirectChild=1 begin
    print N'loai nhung node ko phai [Con Truc Tiep].'
    delete #t where (ParentId is null or ParentId<>@CategoryId) and @CategoryId<>0
    -- select * from #t return ---for debug
end

--==========================================================================
print N'table ket qua.'
select CategoryId=c.Id, CategoryName=case @Lang when 'J' then c.Jname when 'V' then c.Vname else c.Ename end
    , t.ParentId, t.Ord
from #t t inner join Categories c on c.Id=t.Id
order by Ord
/* ---for debug
print N'Xem kq sau de quy tu #t.'
;with q as (
    select Tree=cast(Id as nvarchar(max)), Id, Lv=0, Ord=cast(Id as nvarchar(max))
    from #t
    where ParentId is null --> tat ca nhung node cha
    union all
    select Tree=cast(concat(space(p.Lv*5),'|__',c.Id) as nvarchar(max))
        , c.Id, p.Lv+1
        , Ord=cast(concat(p.Ord,'.',c.Id) as nvarchar(max))
    from #t c
        inner join q p on p.Id=c.ParentId
)
select * from q order by Ord
print 'aaa'
--*/

--==========================================================================
if object_id('tempdb..#t') is not null drop table #t
