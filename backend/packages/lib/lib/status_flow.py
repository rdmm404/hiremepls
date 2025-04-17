from lib.model.applications import ApplicationStatus

# Order from most to least relevant/active
STATUS_ORDER = (
    ApplicationStatus.HIRED,
    ApplicationStatus.OFFER_RECEIVED,
    ApplicationStatus.NEGOTIATING,
    ApplicationStatus.INTERVIEWING,
    ApplicationStatus.ASSESSMENT,
    ApplicationStatus.SCREENING,
    ApplicationStatus.RECEIVED,
    ApplicationStatus.APPLIED,
    ApplicationStatus.PENDING,
    ApplicationStatus.OFFER_DECLINED,
    ApplicationStatus.REJECTED,
    ApplicationStatus.GHOSTED,
    ApplicationStatus.POSITION_CLOSED,
)

APPLICATION_STATUS_FLOW: dict[ApplicationStatus, tuple[ApplicationStatus, ...]] = {
    ApplicationStatus.PENDING: (ApplicationStatus.APPLIED, ApplicationStatus.POSITION_CLOSED),
    ApplicationStatus.OFFER_RECEIVED: (
        ApplicationStatus.HIRED,
        ApplicationStatus.OFFER_DECLINED,
        ApplicationStatus.NEGOTIATING,
        ApplicationStatus.REJECTED,
        ApplicationStatus.GHOSTED,
        ApplicationStatus.POSITION_CLOSED,
    ),
    ApplicationStatus.NEGOTIATING: (
        ApplicationStatus.HIRED,
        ApplicationStatus.OFFER_DECLINED,
        ApplicationStatus.GHOSTED,
        ApplicationStatus.POSITION_CLOSED,
    ),
    ApplicationStatus.HIRED: (),
    ApplicationStatus.OFFER_DECLINED: (),
    ApplicationStatus.REJECTED: (),
    ApplicationStatus.POSITION_CLOSED: (),
}


def validate_status_change(
    initial_status: ApplicationStatus, new_status: ApplicationStatus
) -> tuple[bool, str]:
    if new_status == ApplicationStatus.PENDING:
        return False, f"Updating status to {ApplicationStatus.PENDING} is not allowed."

    if initial_status == new_status:
        return False, "Can't update status to same status."

    valid_statuses = APPLICATION_STATUS_FLOW.get(initial_status)

    if valid_statuses is not None and new_status not in valid_statuses:
        return (
            False,
            f"Invalid status transition ({initial_status} => {new_status}). Valid statuses: {', '.join(valid_statuses)}",
        )
    return True, ""


def get_available_statuses(status: ApplicationStatus) -> list[ApplicationStatus]:
    all_statuses = [
        member
        for member in ApplicationStatus
        if member not in (ApplicationStatus.PENDING, ApplicationStatus.APPLIED)
    ]
    valid_statuses = APPLICATION_STATUS_FLOW.get(status, all_statuses)

    return list(valid_statuses)
