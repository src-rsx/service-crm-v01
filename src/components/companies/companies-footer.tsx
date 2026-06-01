interface CompaniesFooterProps {
  total: number;
  page: number;
  pageSize: number;
}

export function CompaniesFooter({
  total,
  page,
  pageSize,
}: CompaniesFooterProps) {
  const start =
    (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    total
  );

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Showing {start}-{end} of {total}
      </span>
    </div>
  );
}